const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    sessionId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'ExamSessions'
    },
    questionsId : {
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