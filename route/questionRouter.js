const questionController = require('../controller/questionController');

const router = require('express').Router();
const upload = require('../config/multerConfig');
router.post('/create', questionController.createQuestion);
router.post('/upload/:questionId', upload.single('file'), questionController.uploadAudio);
router.put('/update/:id', questionController.updateQuestion);
router.post('/createMultiple', questionController.createMultipleQuestions);
module.exports = router;