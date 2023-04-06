// memanggil dan inisiasi express
const express = require(`express`)
const upload = require('../controller/upload_foto_user')
const app = express()
const auth = require("../auth/auth")
app.use(express.json())

const userController = require('../controller/user_controller')
app.post("/login", userController.login)

app.post("/adduser", upload.single('foto'), userController.addUser)
app.get("/", userController.getAllUser)
app.get("/:nama_user", userController.findUser)
app.put("/update/:id_user", upload.single("foto"), userController.updateUser)

app.delete("/delete/:id_user", userController.deleteUser)
module.exports = app