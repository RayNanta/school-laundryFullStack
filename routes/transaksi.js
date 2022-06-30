//import express
const express = require("express")
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const Paket = models.paket
const member = models.member
const outlet = models.outlet
const user = models.user

//import auth
const auth = require("../auth")
app.use(auth)

//Menampilkan semua transaksi
app.get("/", auth, async (req, res) =>{
    let result = await transaksi.findAll({
       order: [
           ['createdAt','DESC'],
       ],
       include: [
            "member",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: [
                    "paket",
                    {
                        model: models.paket,
                        as : "paket",
                        include: [
                            "outlet",
                            {
                                model: models.outlet,
                                as : "outlet",
                                include: [
                                    "user",
                                    {
                                        model: models.user,
                                        as: "user"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    res.json(result)
})

//Menampilkan transaksi berdasarkan ID Customer
app.get("/:id", auth, async (req, res) =>{
    let param = { id: req.params.id}
    let result = await transaksi.findAll({
        where: param,
        include: [
            "member",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: [
                    "paket",
                    {
                        model: models.paket,
                        as : "paket",
                        include: [
                            "outlet",
                            {
                                model: models.outlet,
                                as : "outlet",
                                include: [
                                    "user",
                                    {
                                        model: models.user,
                                        as: "user"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    res.json(result)
})

//Menampilkan yang belum membayar
app.get("/filter/belum_bayar", auth, async (req, res) =>{
    let result = await transaksi.findAll({
        where: { dibayar: "belum_dibayar" },
        include: [
            "member",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: [
                    "paket",
                    {
                        model: models.paket,
                        as : "paket",
                        include: [
                            "outlet",
                            {
                                model: models.outlet,
                                as : "outlet",
                                include: [
                                    "user",
                                    {
                                        model: models.user,
                                        as: "user"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    res.json(result)
})

//Menambahkan data transaksi baru
app.post("/post", auth, async (req, res) => {
    // let invoice = `INV${Date.now()}`
    let batasWaktu = new Date()
    batasWaktu.setDate(batasWaktu.getDate() + 7)
    let data = {
        id_outlet: req.body.id_outlet,
        kode_invoice: req.body.invoice,
        id_member: req.body.id_member,
        tgl: Date.now(),
        batas_waktu: batasWaktu,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        status: "baru",
        dibayar: "belum_dibayar",
        id_user: req.body.id_user,
    }
    transaksi.create(data)
    .then(async (result) => {
        let paket = await Paket.findByPk(req.body.detail_transaksi[0].id_paket)
        console.log(req.body.detail_transaksi[0].id_paket)
        let jumlah = req.body.detail_transaksi[0].qty
        let keterangan = req.body.detail_transaksi[0].keterangan
        let harga = paket.harga
        let diskon = data.diskon
        let pajak = data.pajak
        let biaya_tambahan = data.biaya_tambahan
        let total = (jumlah * harga) - (diskon / 100 * harga * jumlah) + biaya_tambahan
        let total_harga = total + (pajak / 100 * total)
        detail = req.body.detail_transaksi
        detail.forEach(element => {
            element.id_transaksi = result.id
            element.total_harga = total_harga
            element.keterangan = keterangan
        });
        console.log(detail);
        console.log(req.body.detail_transaksi[0].id_paket)
        detail_transaksi.bulkCreate(detail)
        .then(result => {
            res.json({
                message: "Data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
})

//endpoint mengupdate status pembayaran, METHOD: PUT, function:update
app.put("/ubah-status/:id", (req,res) => {
    let param = {
        id : req.params.id
    }
    let data = {
        status: req.body.status,
    }
    transaksi.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint dibayar
app.put('/bayar/:id', auth, async (req, res) => {
    let params = req.params.id
    let data = {
        total_bayar: req.body.total_bayar
    }
    let data2 = {
        dibayar: "dibayar",
        tgl_bayar: Date.now()
    }
    let tagihan = await detail_transaksi.findOne({ where: { id_transaksi: params } })
    console.log(tagihan.total_harga)

    if (tagihan.total_harga > data.total_bayar) {
        res.json({
            status: "error",
            message: "Maaf uang anda kurang"
        })
    } else {
        detail_transaksi.update(data, { where: { id_transaksi: params } })
            .then(() => {
                transaksi.update(data2, {where: {id : params}})
                .then(() => {
                    res.json({
                        message: "Pembayaran Berhasil"
                    })
                })
                .catch(error => {
                    res.json(error)
                })
            })
            .catch(error => {
                res.json(error)
            })
    }



})

//Menghapus data transaksi
app.delete("/:id", auth, async (req, res) =>{
    let param = { id: req.params.id}
    try {
        await detail_transaksi.destroy({where: param})
        await transaksi.destroy({where: param})
        res.json({
            message : "data has been deleted"
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})


module.exports = app