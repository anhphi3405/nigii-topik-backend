const mongoose = require('mongoose');

const examSessionSchema = new mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Users'
    },
    exam_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Exams'
    },
    start_time : {
        type: Date,
        required: true
    },
    end_time : {
        type: Date,
        required: true
    },
    score : {
        type: Number,
        default: 0
    },
    is_completed : {
        type: Boolean,
        default: false
    },
    user_answers : {
        type: [mongoose.Schema.Types.ObjectId],
        default : []
    }
});

module.exports = mongoose.model('ExamSessions', examSessionSchema);