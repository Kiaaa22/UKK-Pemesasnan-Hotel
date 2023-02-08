const { response } = require('express')

const tipe_kamarModel = require('../models/index').tipe_kamar
const Op = require('sequelize').Op
const upload = require(`./upload_foto_tipe_kamar`).single(`foto`)

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
    let keyword = request.body.keyword
    let tipe_kamars = await tipe_kamarModel.findAll({
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
    upload(request, response, async errpr => {
        if (error){
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`})
        }
    })
    let newTipekamar = {
        nama_tipe_kamar : request.body.nama_tipe_kamar,
        harga : request.body.harga,
        deskripsi : request.body.deskripsi,
        foto : request.file.filename
    }
    tipe_kamarModel.create(newTipekamar)
    .then(result => {
        return response.json ({
            success: true,
            data: result,
            message: 'New tipe kamar has been inserted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//update tipe kamar
exports.updateTipekamar = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error})
        }
        let id_tipe_kamar = request.params.id_tipe_kamar
        let Tipekamar = {
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
            
            if (FileSystem.existsSync(pathFoto)){
                FileSystem.unlink(pathFoto, error => console.log(error))
            }
            tipe_kamar.foto = request.file.filename
        }
        tipe_kamarModel.update(tipe_kamar, { where: {id_tipe_kamar: id_tipe_kamar}})
    })
    // let id_tipe_kamar = request.params.id_tipe_kamar
    //tipe_kamarModel.update(dataTipekamar, {where: { id_tipe_kamar : id_tipe_kamar}})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data tipe kamar has been updated'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//delete tipe kamar
exports.deleteTipekamar = async (request, response)=> {
    const id_tipe_kamar = request.params.id_tipe_kamar
    const tipe_kamar = await tipe_kamarModel.findOne({ where: { id_tipe_kamar : id_tipe_kamar}})
    const oldFotoTipekamar = tipe_kamar.foto
    const pathFoto = path.join(__dirname, `../foto`, oldFotoTipekamar)

    if (fs.existsSync(pathFoto)) {
        fs.unlink(pathFoto, error => console.log(error))
    }
    //let id_tipe_kamar = request.params.id_tipe_kamar
    tipe_kamarModel.destroy({ where: { id_tipe_kamar : id_tipe_kamar}})
    .then(result => {
        return response.json ({
            success: true,
            message: 'Data tepi kamar has been deleted'
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}