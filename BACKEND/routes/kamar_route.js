// memanggil dan inisiasi express
const express = require('express')
const app = express()
app.use(express.json())

const kamarController = require('../controller/kamar_controller')
const auth = require('../auth/auth')

app.get("/get", auth.authVerify, kamarController.getAllKamar)
app.post("/add", auth.authVerify, kamarController.addKamar)
app.post("/find", auth.authVerify, kamarController.findKamar)
app.put("/update/:id_kamar", auth.authVerify, kamarController.updateKamar)
app.delete("/delete/:id_kamar", auth.authVerify, kamarController.deleteKamar)
module.exports = app