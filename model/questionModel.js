const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_text: {
        type: String ,
        required: false,
        default : ''
    },
    options: {
        type: [String],
        required: true
    },
    correct_option: {
        type: Number,
        required: true
    },
    question_img : {
        type : [String],
        require : false
    },
    question_audio: {
        type : mongoose.Schema.Types.ObjectId,
        require : false,
        default : null
    },
    question_order : {
        type : Number,
        require :false
    },
    explanation : {
        type : String,
        require : false,
        default : ''
    },
});

module.exports = mongoose.model('Questions', questionSchema);