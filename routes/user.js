//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const user = model.user

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//endpoint menampilkan semua data user, method: GET, function: findAll()
app.get("/", auth, (req,res) => {
    user.findAll({
        include: {
            model: model.outlet ,
            as : 'outlet'
        }
    })
        .then(result => {
            res.json({
                user : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menampilkan salah satu  data user, method: GET, function: findOne()
app.get("/:id", auth, (req, res) =>{
    user.findOne({ where: {id: req.params.id}})
    .then(result => {
        res.json({
            user: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data user, METHOD: POST, function: create
app.post("/post", auth, (req,res) => {
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : md5(req.body.password),
        id_outlet : req.body.id_outlet,
        role : req.body.role
    }

    user.create(data)
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

//endpoint mengupdate data user, METHOD: PUT, function:update
app.put("/update/:id", auth, (req,res) => {
    let param = {
        id : req.params.id
    }
    let data = {
        nama : req.body.nama,
        username : req.body.username,
        password : md5(req.body.password),
        id_outlet : req.body.id_outlet,
        role : req.body.role
    }
    user.update(data, {where: param})
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

//endpoint menghapus data user, METHOD: DELETE, function: destroy
app.delete("/:id", auth, (req,res) => {
    let param = {
        id : req.params.id
    }
    user.destroy({where: param})
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


//endpoint login
app.post("/auth", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await user.findOne({
        where: data,
        include: {
            model: model.outlet,
            as : 'outlet'
        }
    })
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app