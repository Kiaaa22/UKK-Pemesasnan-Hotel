const { response } = require('express')

const detail_pemesananModel = require('../models/index').detail_pemesanan
const Op = require('sequelize').Op

//get all detail pemesanan
exports.getAllDetailpemesanan = async (request, response) => {
    let detail_pemesanans = await detail_pemesananModel.findAll()
    return response.json({
        success: true,
        data: detail_pemesanans,
        message: 'All detail pemesanan have been loaded'
    })
}

//find detail pemesanan using keyword
exports.findKamar = async (request, response) => {
    let keyword = request.body.keyword
    let detail_pemesanans = await kamarModel.findAll({
    where : {
        [Op.or] : [
            { tgl_akses : {[Op.substring] : keyword}},
            { harga : {[Op.substring] : keyword}},
        ]
    }
})
    return response.json({
        success: true,
        data: detail_pemesanans,
        message: 'All detai pemesanan have been loaded'
    })
}


//add detail pemesanan
exports.addDetailpemesanan = (request, response)=> {
    let newdetail_pemesanan = {
        tgl_akases : request.body.tgl_akases,
        //id_tipe_kamar : request.body.id_tipe_kamar,
    }
    detail_pemesananModel.create(newdetail_pemesanan)
    .then(result => {
        return response.json ({
            success: true,
            data: result,
            message: 'New detail pemesanan has been inserted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//update detail transaksi
exports.updateDetailpemesanan = (request, response) => {
    let datadetail_pemesanan = {
        tgl_akses : request.body.tgl_akses,
        //id_tipe_kamar : request.body.id_tipe_kamar,
    }
    let id_detail_pemesanan = request.params.id_detail_pemesanan
    detail_pemesananModel.update(datadetail_pemesanan, {where: { id_detail_pemesanan : id_detail_pemesanan}})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data detail pemesanan has been updated'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//delete detail pemesanan
exports.deleteDetailpemesanan = (request, response)=> {
    let id_detail_pemesanan = request.params.id_detail_pemesanan
    detail_pemesananModel.destroy({ where: { id_detail_pemesanan : id_detail_pemesanan}})
    .then(result => {
        return response.json ({
            success: true,
            message: 'Data detail pemesanan has been deleted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}