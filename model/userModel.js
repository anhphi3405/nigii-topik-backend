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
        default : 'https://cdn.vectorstock.com/i/500p/96/92/profile-photo-icon-linear-graphics-sign-vector-52049692.jpg'
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