// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const pemesananController =
require('../controller/pemesanan_controller')
app.get("/", pemesananController.getAllPemesanan)
app.post("/", pemesananController.addPemesanan)
app.post("/find", pemesananController.findPemesanan)
app.put("/:id_pemesanan", pemesananController.updatePemesanan)
app.delete("/:id_pemesanan", pemesananController.deletePemesanan)
module.exports = app