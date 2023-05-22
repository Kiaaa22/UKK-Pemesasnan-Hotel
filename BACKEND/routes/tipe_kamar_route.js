// memanggil dan inisiasi express
const express = require('express')
// const upload = require('../controller/upload_foto_tipe_kamar')
const app = express()
app.use(express.json())

const tipe_kamarController = require('../controller/tipe_kamar_controller')
const auth = require('../auth/auth')

app.get("/", auth.authVerify, tipe_kamarController.getAllTipekamar)
app.post("/add", auth.authVerify, tipe_kamarController.addTipekamar)
app.get("/find/:keyword", auth.authVerify, tipe_kamarController.findTipekamar)
app.put("/update/:id_tipe_kamar", auth.authVerify, tipe_kamarController.updateTipekamar)
app.delete("/delete/:id_tipe_kamar", auth.authVerify, tipe_kamarController.deleteTipekamar)
module.exports = app