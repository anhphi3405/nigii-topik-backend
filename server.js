
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const userController = require('./controller/userController');

const hostName = 'localhost';
const port = 5000;

// Middleware để phân tích cú pháp JSON
app.use(express.json());
// app.use('/api', routes);

app.listen(port, hostName, () => {
    // console.log(`Server is running at aaassss http://${hostName}:${port}`);
});



const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect(uri );
}
connectDb();

app.get('/' , (req, res) =>{
    res.send('Hello World');
})

app.post('/user' , async (req, res) =>{
    return userController.createUser(req, res);
})

