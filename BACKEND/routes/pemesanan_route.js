// memanggil dan inisiasi express
const express = require('express')
const app = express.Router()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pemesananController = require('../controller/pemesanan_controller')
const auth = require('../auth/auth')

app.get("/", auth.authVerify, pemesananController.getAllPemesanan)

app.post("/add", auth.authVerify, pemesananController.addPemesanan)
app.post("/find", auth.authVerify, pemesananController.findPemesanan)
app.put("/update/:id", auth.authVerify, pemesananController.updatePemesanan)
app.delete("/delete/:id", auth.authVerify, pemesananController.deletePemesanan)
module.exports = app