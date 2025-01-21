const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref : 'Questions'
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