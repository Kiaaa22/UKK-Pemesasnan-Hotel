const { response } = require('express')

const pemesananModel = require('../models/index').pemesanan
const Op = require('sequelize').Op

//get all pemesanan
exports.getAllPemesanan = async (request, response) => {
    let pemesanans = await pemesananModel.findAll()
    return response.json({
        success: true,
        data: pemesanans,
        message: 'All pemesanan have been loaded'
    })
}

//find pemesanan using keyword
exports.findPemesanan = async (request, response) => {
    let keyword = request.body.keyword
    let pemesanans = await pemesananModel.findAll({
    where : {
        [Op.or] : [
            { nomor_pemesanan : {[Op.substring] : keyword}},
            { nama_pemesanan : {[Op.substring] : keyword}},
            { email_pemesanan : {[Op.substring] : keyword}},
            { tgl_pemesanan : {[Op.substring] : keyword}},
            { tgl_check_in : {[Op.substring] : keyword}},
            { tgl_check_out : {[Op.substring] : keyword}},
            { nama_tamu : {[Op.substring] : keyword}},
            { jumlah_kamar : {[Op.substring] : keyword}},
            { status_pemesanan : {[Op.substring] : keyword}}
            //{ id_user : {[Op.substring] : keyword}}
        ]
    }
})
    return response.json({
        success: true,
        data: pemesanans,
        message: 'All pemesanan have been loaded'
    })
}

//add pemesanan
exports.addPemesanan = (request, response)=> {
    let newPemesanan = {
        nomor_pemesanan : request.body.nomor_pemesanan,
        nama_pemesanan : request.body.nama_pemesanan,
        email_pemesanan : request.body.email_pemesanan,
        tgl_pemesanan : request.body.tgl_pemesanan,
        tgl_check_in : request.body.tgl_check_in,
        tgl_check_out : request.body.tgl_check_out,
        nama_tamu : request.body.nama_tamu,
        jumlah_kamar : request.body.jumlah_kamar,
        status_pemesanan : request.body.status_pemesanan,
        //id_user : request.body.id_user
    }
    pemesananModel.create(newPemesanan)
    .then(result => {
        return response.json ({
            success: true,
            data: result,
            message: 'New pemesanan has been inserted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//update pemesanan
exports.updatePemesanan = (request, response) => {
    let dataPemesanan = {
        nama_pemesanan : request.body.nama_pemesanan,
        email_pemesanan : request.body.email_pemesanan,
        tgl_pemesanan : request.body.tgl_pemesanan,
        tgl_check_in : request.body.tgl_check_in,
        tgl_check_out : request.body.tgl_check_out,
        nama_tamu : request.body.nama_tamu,
        jumlah_kamar : request.body.jumlah_kamar,
        status_pemesanan : request.body.status_pemesanan,
        // id_user : request.body.id_user
    }
    let id_pemesanan = request.params.id_pemesanan
    pemesananModel.update(dataPemesanan, {where: { id_pemesanan : id_pemesanan}})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data pemesanan has been updated'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//delete pemesanan
exports.deletePemesanan = (request, response)=> {
    let id_pemesanan = request.params.id_pemesanan
    pemesananModel.destroy({ where: { id_pemesanan : id_pemesanan}})
    .then(result => {
        return response.json ({
            success: true,
            message: 'Data pemesanan has been deleted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}