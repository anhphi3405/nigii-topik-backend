const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default : 'https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
    },
    role:{
        type: String,
        default: 'user'
    },
    exams_in_progress:{
        type: [mongoose.Schema.Types.ObjectId],
        default : []
    },
    exams_is_completed:{
        type: [mongoose.Schema.Types.ObjectId],
        default : []
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;