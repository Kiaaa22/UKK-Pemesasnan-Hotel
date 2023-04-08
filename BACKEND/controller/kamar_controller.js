const express = require('express')
const app = express()

const kamarModel = require('../models/index').kamar
const Op = require('sequelize').Op

const path = require(`path`)
const fs = require(`fs`)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const jsonwebtoken = require('jsonwebtoken')
const SECRET_KEY = 'secretcode'

//get all kamar
exports.getAllKamar = async (request, response) => {
    let kamars = await kamarModel.findAll()
    return response.json({
        success: true,
        data: kamars,
        message: 'All kamar have been loaded'
    })
}

//find kamar using keyword
exports.findKamar = async (request, response) => {
    let keyword = request.body.keyword
    console.log(keyword)

    let kamars = await kamarModel.findOne({
    where : {
        [Op.or] : [
            { nomor_kamar : {[Op.substring] : keyword}},
        ]
    }
})
    return response.json({
        success: true,
        data: kamars,
        message: 'All kamar have been loaded'
    })
}

//add kamar
exports.addKamar = (request, response)=> {
    let newKamar = {
        nomor_kamar : request.body.nomor_kamar,
    }

    console.log(newamar)
    kamarModel
    .create(newKamar)
    .then((result) => {
        return response.json ({
            success: true,
            data: result,
            message: 'New kamar has been inserted'
        })
    })
    .catch((error) => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//update kamar
exports.updateKamar = (request, response) => {
    let dataKamar = {
        nomor_kamar : request.body.nama_kamar,
    }
    let id_kamar = request.params.id_kamar
    kamarModel
    .update(dataKamar, {where: { id_kamar : id_kamar}})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data kamar has been updated'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//delete kamar
exports.deleteKamar = (request, response)=> {
    let id_kamar = request.params.id_kamar
    kamarModel.destroy({ where: { id_kamar : id_kamar}})
    .then((result) => {
        return response.json ({
            success: true,
            data: result,
            message: 'Data kamar has been deleted'
        })
    })
    .catch((error) => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}