const Questions = require('../model/questionModel');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ tệp
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên tệp
    }
});

const upload = multer({ storage: storage });
const questionController = {
    createQuestion: async (req, res) => {
        try {
            const { question, options, correct_answer } = req.body;
            console.log(req.body);
            const audio = req.file ? req.file.path : null; // Lấy đường dẫn tệp âm thanh nếu có

            const newQuestion = new Questions({
                question,
                audio,
                options,
                correct_answer
            });

            await newQuestion.save();
            res.status(201).json(newQuestion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = questionController;

