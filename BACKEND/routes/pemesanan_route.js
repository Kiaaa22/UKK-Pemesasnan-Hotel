// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const pemesananController = require('../controller/pemesanan_controller')
const auth = require('../auth/auth')

app.get("/", auth, pemesananController.getAllPemesanan)
app.post("/add", auth, pemesananController.addPemesanan)
app.post("/find", auth, pemesananController.findPemesanan)
app.put("/update/:id_pemesanan", auth, pemesananController.updatePemesanan)
app.delete("/delete/:id_pemesanan", auth, pemesananController.deletePemesanan)
module.exports = app