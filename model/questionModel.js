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
    },
    question_file: {
        type : mongoose.Schema.Types.ObjectId,
        require : false,
        default : null
    }
});

module.exports = mongoose.model('Questions', questionSchema);