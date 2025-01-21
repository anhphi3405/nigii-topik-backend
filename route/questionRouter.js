const questionController = require('../controller/questionController');

const router = require('express').Router();

router.post('/', questionController.createQuestion);

module.exports = router;