const express = require(`express`)
const bodyParser = require(`body-parser`)
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const userRoute = require(`./routes/user_route`)
const tipe_kamarRoute = require('./routes/tipe_kamar_route')
const kamarRoute = require(`./routes/kamar_route`)
const pemesananRoute = require('./routes/pemesanan_route')

app.use(express.static(__dirname))
app.use(express.static("foto_tipe_kamar"))
app.use(express.static("foto"))


app.use("/user", userRoute)
app.use('/tipe_kamar', tipe_kamarRoute)
app.use('/kamar', kamarRoute)
app.use('/pemesanan', pemesananRoute)

app.listen(PORT, ()=> {
    console.log(`Server Pemesanan Hotel runs on port ${PORT}`)
})
