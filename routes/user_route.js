// memanggil dan inisiasi express
const express = require(`express`)
const upload = require('../controller/upload_foto_user')
const app = express()
const auth = require("../auth/auth")
app.use(express.json())

const userController = require('../controller/user_controller')
app.post("/login", userController.login)
app.post("/add", upload.single("photo"), userController.addUser)
app.put("/update/:id_user", auth.authVerify, upload.single("photo"), userController.updateUser)
app.delete("/delete/:id_user", auth.authVerify, userController.deleteUser)
app.get("/", userController.getAllUser)
app.get("/:id_user", auth.authVerify, userController.findUser)
module.exports = app