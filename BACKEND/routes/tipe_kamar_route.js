// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const tipe_kamarController = require('../controller/tipe_kamar_controller')
app.get("/", tipe_kamarController.getAllTipekamar)
app.post("/", tipe_kamarController.addTipekamar)
app.post("/find", tipe_kamarController.findTipekamar)
app.put("/:id_tipe_kamar", tipe_kamarController.updateTipekamar)
app.delete("/:id_tipe_kamar", tipe_kamarController.deleteTipekamar)
module.exports = app