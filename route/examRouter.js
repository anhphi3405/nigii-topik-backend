const router = require('express').Router();
const examController = require('../controller/examController');
router.post('/create', examController.createExam);
router.put('/update/:id', examController.updateExam);
router.delete('/delete/:id', examController.deleteExam);

module.exports = router;