const { response } = require('express')

const tipe_kamarModel = require('../models/index').tipe_kamar
const pemesananModel = require('../models/index').pemesanan
const kamarModel = require('../models/index').kamar
const userModel = require('../models/index').user
const detail_pemesananModel = require('../models/index').detail_pemesanan

const Op = require('sequelize').Op

const path = require(`path`)
const fs = require(`fs`)
const { sequelize } = require('../models/index')
const tipe_kamar = require('../models/tipe_kamar')

//get all pemesanan
exports.getAllPemesanan = async (request, response) => {
  let pemesanans = await pemesananModel.findAll({
    attributes: {
      exclude: [ 'tipeKamarIdTipeKamar', 'userIdUser'],
    },
  })
  return response.json({
    success: true,
    data: pemesanans,
    message: 'All pemesanan have been loaded',
  })
}

//find pemesanan using keyword
exports.findPemesanan = async (request, response) => {
  let pemesanans = await sequelize.query(`SELECT id nomor_pemesanan nama_pemesanan email_pemesanan tgl_pemesanan tgl_check_in tgl_check_out nama_tamu jumlah_kamar id_tipe_kamar status_pemesanan id_user createdAt updatedAt FROM pemesanans AS pemesanan WHERE pemesanan.nomor_pemesanan LIKE '%${request.body.keyword}%' OR pemesanan.nama_pemesanan LIKE '%${request.body.keyword}%';`);

  return response.json({
    success: true,
    data: pemesanans,
    message: 'All pemesanan have been loaded',
  })
}

//add pemesanan
exports.addPemesanan = async (request, response) => {
  console.log('awal')
  try {
    const { nomor_kamar, nama_user } = request.body
    console.log('nomor_kamar', nomor_kamar)
    console.log('nama_user', nama_user)
    console.log('hay')
    const kamar = await sequelize.query(
      'SELECT k.id_kamar, k.nomor_kamar, k.createdAt, k.updatedAt, k.id_tipe_kamar, tk.harga FROM kamars as k JOIN tipe_kamars as tk ON k.id_tipe_kamar = tk.id_tipe_kamar',
    )

    console.log('kamar hai', kamar[0][0])

    const id_user = await userModel.findOne({
      where: {
        nama_user: { [Op.substring]: nama_user },
      },
    })
    console.log('id_user', id_user.id_user)

    if (!kamar) {
      return response.json({
        success: false,
        message: 'Kamar yang anda inputkan tidak ada',
      })
    }

    if (!id_user) {
      return response.json({
        success: false,
        message: 'User yang anda inputkan tidak ada',
      })
    }

    const newData = {
      nomor_pemesanan: request.body.nomor_pemesanan,
      nama_pemesanan: request.body.nama_pemesanan,
      email_pemesanan: request.body.email_pemesanan,
      tgl_pemesanan: new Date(),
      tgl_check_in: request.body.tgl_check_in,
      tgl_check_out: request.body.tgl_check_out,
      nama_tamu: request.body.nama_tamu,
      jumlah_kamar: 1,
      id_tipe_kamar: kamar[0][0].id_tipe_kamar,
      status_pemesanan: request.body.status_pemesanan,
      id_user: id_user.id_user,
    }

    console.log('ini newData' + newData.id_tipe_kamar)
    console.log('hello ke hit ga')
    console.log('request.body.tgl_check_in', request.body.tgl_check_in)
    console.log('request.body.tgl_check_out', request.body.tgl_check_out)
    console.log('kamar.id_kamar', kamar[0][0].id_kamar)

    const kamarCheck = await sequelize.query(
      `SELECT p.nomor_pemesanan, dp.id_kamar FROM pemesanans as p JOIN detail_pemesanans as dp ON p.id = dp.id_pemesanan WHERE p.status_pemesanan = 'baru' && dp.id_kamar = ${kamar[0][0].id_kamar}`,
    )
    console.log('kamarCheck', kamarCheck)

    if (kamarCheck[0].length === 0) {
      const tglCheckIn = new Date(request.body.tgl_check_in)
      const tglCheckOut = new Date(request.body.tgl_check_out)
      const diffTime = Math.abs(tglCheckOut - tglCheckIn)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      console.log('ke hit')
      const createdPemesanan = await pemesananModel.create(newData)

      const id = createdPemesanan.id
      const detailData = []

      for (let i = 0; i <= diffDays; i++) {
        const newDetail = {
          id_pemesanan: id,
          id_kamar: kamar.id,
          tgl_akses: new Date(tglCheckIn.getTime() + i * 24 * 60 * 60 * 1000),
          harga: kamar.harga,
        }
        detailData.push(newDetail)
      }

      await detail_pemesananModel.bulkCreate(detailData)

      return response.json({
        success: true,
        message: 'New transaction has been inserted',
      })
    } else {
      return response.json({
        success: false,
        message: 'Kamar yang anda pesan sudah di booking',
      })
    }
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    })
  }
}

//update pemesanan
exports.updatePemesanan = (request, response) => {
  let dataPemesanan = {
    nama_pemesanan: request.body.nama_pemesanan,
    email_pemesanan: request.body.email_pemesanan,
    tgl_pemesanan: request.body.tgl_pemesanan,
    tgl_check_in: request.body.tgl_check_in,
    tgl_check_out: request.body.tgl_check_out,
    nama_tamu: request.body.nama_tamu,
    jumlah_kamar: request.body.jumlah_kamar,
    status_pemesanan: request.body.status_pemesanan,
    // id_user : request.body.id_user
  }
  let id = request.params.id
  pemesananModel
    .update(dataPemesanan, { where: { id: id } })
    .then((result) => {
      return response.json({
        success: true,
        message: 'Data pemesanan has been updated',
      })
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      })
    })
}

//delete pemesanan
exports.deletePemesanan = (request, response) => {
  let id = request.params.id
  pemesananModel
    .destroy({ where: { id: id } })
    .then((result) => {
      return response.json({
        success: true,
        message: 'Data pemesanan has been deleted',
      })
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      })
    })
}
