const Answers = require('../model/answerModel');
const answerController = {
    createAnswer : async (req, res) => {
        try {
            const answer = new Answers(req.body);
            await answer.save();
            res.status(201).send(answer);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateAnswer : async (req, res) => {
        const id = req.params.id;
        try {
            const answer = await Answers.findByIdAndUpdate(id
                , req.body);
            await answer.save();
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteAnswer : async (req, res) => {
        const id = req.params.id;
        try {
            const answer = await Answers.findByIdAndDelete(id);
            if(!answer) {
                return res.status(404).json({ message: 'Answer not found' });
            }
            res.status(200).json({ message: 'Answer deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = answerController;