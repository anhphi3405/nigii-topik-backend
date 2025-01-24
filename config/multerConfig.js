const multer = require('multer');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const conn = require('mongoose').createConnection(MONGO_URI);
let gfs;

conn.once('open', () =>{
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'E:/WORKSPACE/upload'); // Thư mục lưu trữ tệp
    },
    filename: (req, file, cb) => {
        const questionId = req.params.questionId;
        const fileExtension = path.extname(file.originalname);
        const fileName = questionId + fileExtension;
        cb(null, fileName); // Tên tệp sẽ được lưu trữ
    }
});



const upload = multer({ storage });

module.exports = upload;