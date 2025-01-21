const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const configExpress = require('./config/configExpress');
const authRouter = require('./route/authRouter');
const userRouter = require('./route/userRouter');
const questionRouter = require('./route/questionRouter');
const hostName = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
configExpress(app);
app.use(express.json());
app.listen(port, hostName, () => {});

const uri = process.env.MONGO_URI;// ss
const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect(uri );
    // console.log('Database connected');
}
connectDb();

// console.log('server is running');

// Routes
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/question", questionRouter);















app.get('/' , (req, res) =>{
    res.send('Hello World');
})


