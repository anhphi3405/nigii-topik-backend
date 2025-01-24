const Exams = require('../model/examModel');
const questionController = require('./questionController');
const Questions = require('../model/questionModel');
const examController = {
    createExam : async (req, res) => {
        try {
            const { examName, questions, type } = req.body;
            const createAt = Date.now();
            const updateAt = Date.now();
            const newExam = new Exams({
                examName,
                questions,
                createAt,
                updateAt,
                type
            });
            await newExam.save();
            res.status(201).json(newExam);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = examController;

