// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const detailpemesananController =
require('../controller/detail_pemesanan_controller')
app.get("/", detail_pemesananController.getAllDetailpemesanan)
app.post("/", detail_pemesananController.addDetailpemesanan)
app.post("/find", detail_pemesananController.findDetailpemesanan)
app.put("/:id_detail_pemesanan", detail_pemesananController.updateDetailpemesanan)
app.delete("/:id_detail_pemesanan", detail_pemesananController.deleteDetailpemesanan)
module.exports = app