const router = require('express').Router();
const examController = require('../controller/examController');
router.post('/create', examController.createExam);


module.exports = router;