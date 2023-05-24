const express = require('express')
const app = express()

const kamarModel = require('../models/index').kamar
const tipe_kamarModel = require('../models/index').tipe_kamar
const Op = require('sequelize').Op

const path = require(`path`)
const fs = require(`fs`)

const bodyParser = require('body-parser')
const { sequelize } = require('../models/index')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// get all kamar
exports.getAllKamar = async (request, response) => {
  let kamars = await kamarModel.findAll({
    attributes: ['id_kamar', 'id_tipe_kamar', 'nomor_kamar'],
    include: {
      model: tipe_kamarModel,
      attributes: ['harga', 'id_tipe_kamar', 'nama_tipe_kamar', 'deskripsi', 'foto'],
      on: sequelize.literal('kamar.id_tipe_kamar = tipe_kamar.id_tipe_kamar')
    },
    group: ['kamar.id_kamar']
  });

  return response.json({
    success: true,
    data: kamars,
    message: 'All kamar have been loaded'
  });
}

// find kamar
exports.findKamar = async (request, response) => {
  let keyword = request.body.keyword
    let kamars = await kamarModel.findAll({
   where : {
          [Op.or] : [
              { nomor_kamar : {[Op.substring] : keyword}},
          ]
      },
      attributes: ['id_kamar', 'id_tipe_kamar', 'nomor_kamar'],
      include: {
        model: tipe_kamarModel,
        attributes: ['harga', 'id_tipe_kamar', 'nama_tipe_kamar', 'deskripsi', 'foto'],
        on: sequelize.literal('kamar.id_tipe_kamar = tipe_kamar.id_tipe_kamar')
      },
      group: ['kamar.id_kamar']
    });
    
      return response.json({
          success: true,
          data: kamars,
          message: 'All kamar have been loaded'
      })
  }

// add kamar
exports.addKamar = async (request, response) => {
  let newKamar = {
    nomor_kamar: request.body.nomor_kamar,
    id_tipe_kamar: request.body.id_tipe_kamar,
  }
  console.log(newKamar)
  
    let tipe_kamar = await tipe_kamarModel.findOne({
      where: { 
        id_tipe_kamar: newKamar.id_tipe_kamar,
      },
    })

    if(tipe_kamar){

      let tes = newKamar.id_tipe_kamar == tipe_kamar.id_tipe_kamar
      console.log(tes) 
    
    if (tes) {
      kamarModel.create(newKamar)
        .then(result => {
          return response.json({
            success: true,
            data: result,
            message: 'Kamar telah ditambahkan'
          })
        })
        .catch(error => {
          return response.json({
            success: false,
            message: error.message
          })
        })}
    } else {
      return response.json({
        success: false,
        message: "Tipe kamar tidak ditemukan"
      })
    }
  }
  
// update kamar
exports.updateKamar = (request, response) => {
    let dataKamar = {
        nomor_kamar : request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar
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