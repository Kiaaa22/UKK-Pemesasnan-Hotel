const express = require('express')
const app = express()

const tipe_kamarModel = require('../models/index').tipe_kamar
const Op = require('sequelize').Op

const path = require(`path`)
const fs = require(`fs`)

const upload = require(`./upload_foto_tipe_kamar`).single(`foto`)

const bodyParser = require(`body-parser`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

const jsonwebtoken = require(`jsonwebtoken`)
const SECRET_KEY = `secretcode`

//get all tipe kamar
exports.getAllTipekamar = async (request, response) => {
    let tipe_kamars = await tipe_kamarModel.findAll()
    return response.json({
        success: true,
        data: tipe_kamars,
        message: 'All tipe kamar have been loaded'
    })
}

//find tipe kamar using keyword
exports.findTipekamar = async (request, response) => {
    let keyword = request.params.keyword
    console.log(keyword)

    let tipe_kamars = await tipe_kamarModel.findOne({
    where : {
        [Op.or] : [
            { nama_tipe_kamar : {[Op.substring] : keyword}},
            { deskripsi : {[Op.substring] : keyword}}
        ]
    }

}) 
    return response.json({
        success: true,
        data: tipe_kamars,
        message: 'All tipe kamar have been loaded'
    })
}

//add tipe kamar
exports.addTipekamar = async (request, response)=> {
    const req = JSON.parse(JSON.stringify(request.body))
    console.log(req)
    upload(request, response, async (error) => {
        if (error){
            return response.json({ message: error, inpo: 'aaaaa' })
        }
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`})
        }

        let newTipekamar = {
            nama_tipe_kamar : request.body.nama_tipe_kamar,
            harga : request.body.harga,
            deskripsi : request.body.deskripsi,
            foto : request.file.filename
        }
        
    console.log(newTipekamar)
    tipe_kamarModel
    .create(newTipekamar)
    .then((result) => {
        return response.json ({
            success: true,
            data: result,
            message: 'New tipe kamar has been inserted'
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

//update tipe kamar
exports.updateTipekamar = async (request, response) => {
    const req = JSON.parse(JSON.stringify(request.body))
    console.log('request.body', request.file)
    upload(request, response, async (error) => {
        let id_tipe_kamar = request.params.id_tipe_kamar
        const tipe_kamar = {
            nama_tipe_kamar : request.body.nama_tipe_kamar,
            harga : request.body.harga,
            deskripsi : request.body.deskripsi,
            foto : request.file.filename
        }
        if (request.file) {
            const selectedTipekamar = await tipe_kamarModel.findOne({
                where: {id_tipe_kamar : id_tipe_kamar}
            })
            const oldFotoTipekamar = selectedTipekamar.foto
            const pathFoto = path.join(__dirname, `../foto_tipe_kamar`, oldFotoTipekamar)
            
            if (fs.existsSync(pathFoto)){
                fs.unlink(pathFoto, error => console.log(error))
            }
            tipe_kamar.foto = request.file.filename
        }
    
        console.log('tipe_kamar', tipe_kamar)
        tipe_kamarModel
        .update(tipe_kamar, {where: {id_tipe_kamar: id_tipe_kamar}})
        .then((result) => {
            return response.json({
                success: true,
                data: result,
                message: 'Data tipe kamar has been updated'
            })
        })
        .catch((error) => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    })
}

//delete tipe kamar
exports.deleteTipekamar = async (request, response)=> {
    const id_tipe_kamar = request.params.id_tipe_kamar
    const tipe_kamar = await tipe_kamarModel.findOne({ where: { id_tipe_kamar : id_tipe_kamar}})
    const pathFoto = path.join(__dirname, `foto_tipe_kamar`)

    if (fs.existsSync(pathFoto)) {
        fs.unlink(pathFoto, error => console.log(error))
    }
    tipe_kamarModel
    .destroy({ where: { id_tipe_kamar : id_tipe_kamar}})
    .then(result => {
        return response.json ({
            success: true,
            message: 'Data tipe kamar has been deleted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}