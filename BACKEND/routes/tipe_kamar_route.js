// memanggil dan inisiasi express
const express = require('express')
const upload = require('../controller/upload_foto_tipe_kamar')
const app = express()
const auth = require('../auth/auth')
app.use(express.json())

const tipe_kamarController = require('../controller/tipe_kamar_controller')

app.get("/", tipe_kamarController.getAllTipekamar)
app.post("/add",upload.single('foto'), tipe_kamarController.addTipekamar)
app.get("/find/:nama_tipe_kamar", tipe_kamarController.findTipekamar)
app.put("/update/:nama_tipe_kamar", upload.single('foto_tipe_kamar'), tipe_kamarController.updateTipekamar)
app.delete("/delete/:nama_tipe_kamar", tipe_kamarController.deleteTipekamar)
module.exports = app