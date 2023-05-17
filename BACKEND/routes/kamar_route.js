// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const kamarController = require('../controller/kamar_controller')
const auth = require('../auth/auth')

app.get("/get", auth, kamarController.getAllKamar)
app.post("/add", auth, kamarController.addKamar)
app.post("/find", auth, kamarController.findKamar)
app.put("/update/:id_kamar", auth, kamarController.updateKamar)
app.delete("/delete/:id_kamar", auth, kamarController.deleteKamar)
module.exports = app