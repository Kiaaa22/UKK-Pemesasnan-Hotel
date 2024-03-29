const multer = require(`multer`)
const path = require(`path`)
const express = require(`express`)
const app = express()
const fs = require(`fs`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, `../foto_tipe_kamar`))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})

const upload = multer ({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`]
        if (!acceptedType.includes(file.mimetype)) {
            cb(null, false)
            return cb(`Invalid file type (${file.mimetype})`)
        }

        const fileSize = req.headers[`content-length`]
        const maxSize = (1 * 1024 * 1024) // max : 1mb
        if(fileSize > maxSize){
            cb(null, false)
            return cb(`File size is too large`)
        }
        cb(null, true)
    }
})

module.exports = upload