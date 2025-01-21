const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String ,
        required: true
    },
    audio : {
        type: String,
        required: false
    },
    options: {
        type: [String],
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Questions', questionSchema);