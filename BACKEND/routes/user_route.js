// memanggil dan inisiasi express
const express = require(`express`)
// const upload = require('../controller/upload_foto_user')
const app = express()

app.use(express.json())

const userController = require('../controller/user_controller')
const auth = require("../auth/auth")

app.post("/login", userController.login)

app.post("/adduser", auth.authVerify, userController.addUser)
app.get("/", auth.authVerify, userController.getAllUser)
app.get("/find/:nama_user", auth.authVerify, userController.findUser)
app.put("/update/:id_user", auth.authVerify, userController.updateUser)
app.delete("/delete/:id_user", auth.authVerify, userController.deleteUser)
module.exports = app