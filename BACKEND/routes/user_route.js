// memanggil dan inisiasi express
const express = require(`express`)
// const upload = require('../controller/upload_foto_user')
const app = express()

app.use(express.json())

const userController = require('../controller/user_controller')
const auth = require("../auth/auth")

app.post("/login", userController.login)
app.post("/adduser", auth, userController.addUser)
app.get("/", auth, userController.getAllUser)
app.get("/find/:nama_user", auth, userController.findUser)
app.put("/update/:id_user", auth, userController.updateUser)
app.delete("/delete/:id_user", auth, userController.deleteUser)
module.exports = app