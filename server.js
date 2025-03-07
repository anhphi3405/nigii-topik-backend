const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const authRouter = require('./route/authRouter');
const userRouter = require('./route/userRouter');
const questionRouter = require('./route/questionRouter');
const examRouter = require('./route/examRouter');
const hostName = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
const answerRouter = require('./route/answerRouter');
const examSessionRouter = require('./route/examSessionRouter');
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(bodyparser.urlencoded({ extended: true }));
app.listen(port, hostName, () => {});



const uri = process.env.MONGO_URI;// ss
const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect(uri);
}
//


connectDb();



//
// Routes
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/question", questionRouter);
app.use("/v1/exam", examRouter);
app.use("/v1/answer", answerRouter);
app.use("/v1/exam_session", examSessionRouter);



const { upload } = require("./utils/upload");

let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
  });
})();

app.post("/upload/file/:questionId", upload().single("file"), async (req, res) => {
    try {
      res.status(201).json({ text: "File uploaded successfully !" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: { text: "Unable to upload the file", error },
      });
    }
  });//

  app.get("/download/files/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
  
      // Check if file exists
      const file = await bucket
        .find({ _id: new mongoose.Types.ObjectId(fileId) })
        .toArray();
      if (file.length === 0) {
        return res.status(404).json({ error: { text: "File not found" } });
      }
  
      // set the headers
      res.set("Content-Type", file[0].contentType);
      res.set("Content-Disposition", `attachment; filename=${file[0].filename}`);
  
      // create a stream to read from the bucket
      const downloadStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(fileId)
      );
  
      // pipe the stream to the response
      downloadStream.pipe(res);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: { text: `Unable to download file`, error } });
    }
  });

  app.put("/rename/file/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
      const { filename } = req.body;
      await bucket.rename(new mongoose.Types.ObjectId(fileId), filename);
      res.status(200).json({ text: "File renamed successfully !" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: { text: `Unable to rename file`, error },
      });
    }
  });


  app.delete("/delete/file/:fileId", async (req, res) => {
    try {
      const { fileId } = req.params;
      await bucket.delete(new mongoose.Types.ObjectId(fileId));
      res.status(200).json({ text: "File deleted successfully !" });
    } catch (error) {
      console.log(error);
      res.status(400).json({//
        error: { text: `Unable to delete file`, error },
      });
    }
  });

  app.delete("/delete/files", async (req, res) => {
    try {
      await bucket.drop();
      res.status(200).json({ text: "Files deleted successfully !" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: { text: `Unable to delete files`, error },
      });
    }
  }
  );















app.get('/' , (req, res) =>{
    res.send('Hello World');
})


