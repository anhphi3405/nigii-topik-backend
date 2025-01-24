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
    correct_answer: {
        type: String,
        required: true
    },
    question_img : {
        type : String,
        require : false,
        default : ''
    }
});

module.exports = mongoose.model('Questions', questionSchema);