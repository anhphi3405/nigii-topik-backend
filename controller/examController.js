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
    },
    updateExam : async (req, res) => {
        const id = req.params.id;
        try {
            const { examName, questions, type } = req.body;
            const updateAt = Date.now();
            const updatedExam = await Exams.findByIdAndUpdate(id, { examName, questions, updateAt, type });
            updatedExam.save();
            res.status(200).json(updatedExam);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteExam : async (req, res) => {
        const id = req.params.id;
        try {
            const exam = await Exams.findByIdAndDelete(id);
            if(!exam) {
                return res.status(404).json({ message: 'Exam not found' });
            }
            res.status(200).json({ message: 'Exam deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteAll : async (req, res) => {
        try {
            await Exams.deleteMany();
            res.status(200).json({ message: 'All exams deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = examController;

