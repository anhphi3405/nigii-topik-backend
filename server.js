const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const configExpress = require('./config/configExpress');
const authRouter = require('./route/authRouter');
const userRouter = require('./route/userRouter');
const hostName = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
configExpress(app);
app.use(express.json());
app.listen(port, hostName, () => {});

const uri = process.env.MONGO_URI ||'mongodb+srv://anhphi_3405:phi30042005@cluster0.qtls4.mongodb.net/md3405';
const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect(uri );
    console.log('Database connected');
}
connectDb();

console.log('server is running');

// Routes
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);















app.get('/' , (req, res) =>{
    res.send('Hello World');
})


