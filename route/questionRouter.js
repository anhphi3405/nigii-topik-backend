const questionController = require('../controller/questionController');
const router = require('express').Router();
router.post('/create', questionController.createQuestion);
router.put('/update/:id', questionController.updateQuestion);
// createMultiple truyen vao body examId de add questions vao exam
router.post('/createMultiple', questionController.createMultipleQuestions);
router.delete('/delete/:id', questionController.deleteQuestion);
module.exports = router;