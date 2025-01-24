const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref : 'Questions'
        ,default : []
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    type : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Exams', examSchema);