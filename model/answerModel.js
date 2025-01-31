const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    session_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'ExamSessions'
    },
    question_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Questions'
    },
    user_answer : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Answers', answerSchema);