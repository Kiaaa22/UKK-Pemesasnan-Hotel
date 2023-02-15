const multer = require(`multer`);
const path = require(`path`);

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, `./foto`)
    },
    filename: (req, file, cb) => {
        cb(null, `foto-${Date.now()}-${path.extname(file.originalname)}`)
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
        const maxSize = (1 * 1024 * 1024) //max size 1mb
        if(fileSize > maxSize){
            cb(null, false)
            return cb(`File size is to large`)
        }
        cb(null, true)
    }
})
module.exports = upload