const md5 = require('md5')
const userModel = require('../models/index').user
const Op = require('sequelize').Op
const upload = require(`./upload_foto_user`).single(`foto_user`)

//get all user
exports.getAllUser = async (request, response) => {
    let users = await userModel.findAll()
    return response.json({
        success: true,
        data: users,
        message: 'All users have been loaded'
    })
}

exports.login = async (req, res) => {
    try {
        const params = {
            email: req.body.email,
            password: md5(req.body.password),
        };
        const findUser = await user.findOne({ where : params});
            if (findUser == null) {
                return res.status(404).json({
                    message: "email or password doesn't match",
                    err: error,
                });
            }
            console.log(findUser)
            let tokenPayload = {
                id_user: findUser.id_customer,
                email: findUser.email,
                role: findUser.role,
            };
            tokenPayload = JSON.stringify(tokenPayload);
            let token = await jsonwebtoken.sign(tokenPayload, SECRET_KEY);
            return res.status(200).json({
                message: "Success login",
                data: {
                    token: token,
                    id_user: findUser.id_user,
                    email: findUser.email,
                    role: findUser.role,
                },
            });
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err: err.message,
        });
    }
};
//find user using keyword
exports.findUser = async (request, response) => {
    let keyword = request.body.keyword
    let users = await userModel.findAll({
    where : {
        [Op.or] : [
            { nama_user : {[Op.substring] : keyword}},
            { email : {[Op.substring] : keyword}}
        ]
    }
})
    return response.json({
        success: true,
        data: users,
        message: 'All users have been loaded'
    })
}
//add user
exports.addUser = async (request, response)=> {
    try{
    console.log("tes")
    upload(request, response, async error => {
        if (error){
            return response.json({ message: error})
        }
        if (!request.file) {
            return response.json({ message: `Nothing to Upload` })
        }
    })

    let newUser = {
        nama_user : request.body.nama_user,
        foto : request.file.filename,
        email : request.body.email,
        password : request.body.password,
        role : request.body.role,
    }

    console.log(newUser)
    await userModel.create(newUser)
    .then(result => {
        return response.json ({
            success: true,
            data: result,
            message: 'New user has been inserted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
} catch(err){
    return res.status(401).json({
        message: `err`
        ,err: err
    })
}
}

//update user
exports.updateUser = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error})
        }
        let id_user = request.params.id_user
        let user = {
            nama_user : request.body.nama_user,
            foto : request.file.filename,
            email : request.body.email,
            password : request.body.password,
        }
        if (request.file) {
            const selectedUser = await userModel.findOne ({
                where: {id_user : id_user}
            })
            const oldFotoUser = selectedUser.foto
            const pathFoto = path.join(__dirname, `../foto`, oldFotoUser)

            if (FileSystem.existsSync(pathFoto)) {
                FileSystem.unlink(pathFoto, error => console.log(error))
            }
            user.foto = request.file.filename
        }
    })
    let id_user = request.params.id_user
    userModel.update(dataUser, {where: { id_user : id_user}})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data user has been updated'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//delete user
exports.deleteUser = async (request, response)=> {
    const id_user = request.params.id_user
    const user = await userModel.findOne({ where: {id_user : id_user}})
    const oldFotoUser = user.foto
    const pathFoto = path.join(__dirname, `../foto`, oldFotoUser)

    if (FileSystem.existsSync(pathFoto)){
        FileSystem.unlink(pathFoto, error => console.log(error))
    }
    userModel.destroy({ where: {id_user : id_user}})
.then(result => {
        return response.json({
            success: true,
            message: `Data user has been deleted`
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}