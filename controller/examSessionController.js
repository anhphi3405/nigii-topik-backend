
const ExamSessions = require('../model/examSessionModel');
const Answers = require('../model/answerModel');
// const Questions = require('../model/questionModel');
const examSessionController = {
    createExamSession: async (req, res) => {
        try {
            const examSession = new ExamSessions(req.body);
            await examSession.save();
            res.status(201).send(examSession);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateExamSession: async (req, res) => {
        const id = req.params.id;
        try {
            const examSession = await ExamSessions.findByIdAndUpdate(id, req.body);
            await examSession.save();
        }
        catch (error) {
            res.status(400).send(error);
        }
    },
    deleteExamSession: async (req, res) => {
        const id = req.params.id;
        try {
            const examSession = await ExamSessions.findByIdAndDelete(id);
            if (!examSession) {
                res.status(404).send('Exam Session not found');
            }
            res.status(200).send('Exam Session deleted successfully');
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateUserAnswers : async (req, res) => {
        try {
            const {examSessionId, answerId} = req.body;
            const examSession = await ExamSessions.findById(examSessionId);
            if(!examSession || !answerId) {
                return res.status(404).json({ message: 'Exam Session or Answer not found' });   
            }
            await examSession.save();
            
            examSession.user_answers.push(answerId);   
            const answer = await Answers.findById(answerId);
            const question = answer.populate('question_id');
            if(!question) {
                return res.status(404).json({ message: 'Question not found' });
            }
            if(answer.user_answer == question.correct_answer) {
                examSession.score++;
                await examSession.save();
                res.status(200).json({ message: 'Correct Answer' });
            }
        }
        catch (error) {
            res.status(400).send(error);
        }
    },
    deleteAll: async (req, res) => {
        try {
            await ExamSessions.deleteMany();
            res.status(200).send('All exam sessions deleted successfully');
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

module.exports = examSessionController;