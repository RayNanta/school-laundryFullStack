//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const paket = model.paket

//import auth
const auth = require("../auth")
app.use(auth)

//endpoint menampilkan semua data paket, method: GET, function: findAll()
app.get("/", auth, (req,res) => {
    paket.findAll({
        include : {
            model : model.outlet,
            as : 'outlet'
        }
    })
        .then(result => {
            res.json({
                paket : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menampilkan salah satu  data paket, method: GET, function: findOne()
app.get("/:id", auth, (req, res) =>{
    paket.findOne({ where: {id: req.params.id}})
    .then(result => {
        res.json({
            paket: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data paket, METHOD: POST, function: create
app.post("/post", auth, (req,res) => {
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket : req.body.nama_paket,
        harga : req.body.harga
    }

    paket.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint mengupdate data paket, METHOD: PUT, function:update
app.put("/update/:id", auth, (req,res) => {
    let param = {
        id : req.params.id
    }
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket : req.body.nama_paket,
        harga : req.body.harga
    }
    paket.update(data, {where: param})
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

//endpoint menghapus data paket, METHOD: DELETE, function: destroy
app.delete("/:id", auth, (req,res) => {
    let param = {
        id : req.params.id
    }
    paket.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app