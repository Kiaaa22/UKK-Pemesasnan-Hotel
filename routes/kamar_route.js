// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const kamarController =
require('../controller/kamar_controller')
app.get("/", kamarController.getAllKamar)
app.post("/", kamarController.addKamar)
app.post("/find", kamarController.findKamar)
app.put("/:id_kamar", kamarController.updateKamar)
app.delete("/:id_kamar", kamarController.deleteKamar)
module.exports = app