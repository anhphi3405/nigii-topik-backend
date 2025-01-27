const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
//
// Create storage engine
function upload() {
  const mongodbUrl = process.env.MONGO_URI;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };