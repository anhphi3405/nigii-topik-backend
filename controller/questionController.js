const Questions = require('../model/questionModel');
const Exams = require('../model/examModel');
const questionController = {
    createQuestion: async (req, res) => {
        try {
            const { question_text, options, correct_answer, question_img } = req.body;
            console.log(req.body);
            if(!question_text && !question_img) {
                return res.status(400).json({ message: 'Please provide question text or image' });
            }
            const newQuestion = new Questions({
                question_text,
                options,
                correct_answer,
                question_img
            });

            await newQuestion.save();
            res.status(201).json(newQuestion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateQuestion: async (req, res) => {
        const id = req.params.id;
        try {
            const { question, options, correct_answer} = req.body;
            const updatedQuestion = await Questions.findByIdAndUpdate(id, { question, options, correct_answer});
            updatedQuestion.save();
            res.status(200).json(updatedQuestion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    uploadAudio : async (req, res) => {
        console.log(req.file);
        res.json({file: req.file});
        
    },
    getAudio : async (req, res) => {
        //s
    },
    createMultipleQuestions: async (req, res) => {
        try {
            const questions = req.body.questions;
            const examId = req.body.examId;
            const newQuestions = await Questions.insertMany(questions);
            if(examId) {
                const exam = await Exams.findById(examId);
                if(!exam) {
                    return res.status(404).json({ message: 'Exam not found' });
                }
                exam.questions.push(...newQuestions.map(q => q._id));
                await exam.save();
            }
            res.status(201).json(newQuestions);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = questionController;

