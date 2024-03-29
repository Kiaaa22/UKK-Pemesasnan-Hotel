const express = require('express')
const app = express()

const userModel = require('../models/index').user
const Op = require('sequelize').Op
const md5 = require('md5')
const path = require(`path`)
const fs = require(`fs`)

const upload = require(`./upload_foto_user`).single(`foto`)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const jsonwebtoken = require('jsonwebtoken')
const { sequelize } = require('../models/index')
const SECRET_KEY = 'secretcode'

//login
exports.login = async (request, response) => {
  try {
    const params = {
      email: request.body.email,
      password: request.body.password,
    };
    console.log(params.email);
    const findUser = await userModel.findOne({ where: params });
    if (findUser == null) {
      return response.status(404).json({
        message: "email or password doesn't match",
        err: error,
      });
    }
    console.log(findUser);
    //generate jwt token
    let tokenPayLoad = {
      id_user: findUser.id_user,
      email: findUser.email,
      role: findUser.role,
    };
    tokenPayLoad = JSON.stringify(tokenPayLoad);
    let token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY);

    return response.status(200).json({
      message: "Success login",
      data: {
        token: token,
        id_user: findUser.id_user,
        email: findUser.email,
        role: findUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal error",
      err: error.message,
    });
  }
}

//get all user
exports.getAllUser = async (request, response) => {
  let users = await userModel.findAll({
    attributes: ['id_user', 'nama_user', 'foto', 'email', 'password', 'role'],
  });
  return response.json({
    success: true,
    data: users,
    message: 'All users have been loaded',
  })
}

//find user using keyword
exports.findUser = async (request, response) => {
  let keyword = request.body.nama_user
  console.log(keyword)

  let users = await userModel.findAll({
    attributes: ['id_user', 'nama_user', 'foto', 'email', 'password', 'role'],
    where: {
      [Op.or]: [
        { nama_user: { [Op.substring]: keyword } }
      ],
    },
  })
  return response.json({
    success: true,
    data: users,
    message: 'All users have been loaded',
  })
}
//add user
exports.addUser = (request, response) => {
  const req = JSON.parse(JSON.stringify(request.body))
  console.log(req)
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error, inpo: 'uuuu' })
    }
    if (!request.file) {
      return response.json({ message: `Nothing to Upload` })
    }

    let newUser = {
      nama_user: request.body.nama_user,
      foto: request.file.filename,
      email: request.body.email,
      password: request.body.password,
      role: request.body.role,
    }

    console.log(newUser)
    userModel
      .create(newUser)
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: 'New user has been inserted',
        })
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        })
      })
  })
}

//update user
exports.updateUser = (request, response) => {
  const req = JSON.parse(JSON.stringify(request.body))
  console.log('request.body', request.file)
  upload(request, response, async (error) => {
    let id_user = request.params.id_user
    const user = {
      nama_user: request.body.nama_user,
      email: request.body.email,
      password: request.body.password,
      role: request.body.role
    }
    if (request.file) {
      const selectedUser = await userModel.findOne({
        where: { id_user: id_user },
      })
      const oldFotoUser = selectedUser.foto
      const pathFoto = path.join(__dirname, `../foto/`, oldFotoUser)

      if (fs.existsSync(pathFoto)) {
        fs.unlink(pathFoto, (error) => console.log(error))
      }
      user.foto = request.file.filename
    }
    console.log('user', user)
    userModel
      .update(user, { where: { id_user: id_user } })
      .then((result) => {
        return response.json({
          success: true,
          data: result,
          message: 'Data user has been updated',
        })
      })
      .catch((error) => {
        return response.json({
          success: false,
          message: error.message,
        })
      })
  })
}

//delete user
exports.deleteUser = async (request, response) => {
  const id_user = request.params.id_user
  const user = await userModel.findOne({ where: { id_user: id_user } })
  const oldFotoUser = user.foto
  const pathFoto = path.join(__dirname, `foto`, oldFotoUser)

  if (fs.existsSync(pathFoto)) {
    fs.unlink(pathFoto, error => console.log(error))
  }
  userModel
    .destroy({ where: { id_user: id_user } })
    .then(result => {
      return response.json({
        success: true,
        message: `Data user has been deleted`,
      })
    })
    .catch(error => {
      return response.json({
        success: false,
        message: error.message,
      })
    })
}
