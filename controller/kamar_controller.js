const { response } = require('express')

const kamarModel = require('../models/index').kamar
const Op = require('sequelize').Op

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
    let kamars = await kamarModel.findAll({
    where : {
        [Op.or] : [
            { nomor_kamar : {[Op.substring] : keyword}},
            //{ id_tipe_kamar : {[Op.substring] : keyword}},
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
    let newkamar = {
        nomor_kamar : request.body.nomor_kamar,
        //id_tipe_kamar : request.body.id_tipe_kamar,
    }
    kamarModel.create(newkamar)
    .then(result => {
        return response.json ({
            success: true,
            data: result,
            message: 'New kamar has been inserted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//update kamar
exports.updateKamar = (request, response) => {
    let datakamar = {
        nomor_kamar : request.body.nama_kamar,
        //id_tipe_kamar : request.body.id_tipe_kamar,
    }
    let id_kamar = request.params.id_kamar
    kamarModel.update(datakamar, {where: { id_kamar : id_kamar}})
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
    .then(result => {
        return response.json ({
            success: true,
            message: 'Data kamar has been deleted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}