const router = require('express').Router();

const answerController = require('../controller/answerController');

router.post('/create', answerController.createAnswer);
router.put('/update/:id', answerController.updateAnswer);
router.delete('/delete/:id', answerController.deleteAnswer);
router.delete('/delete_all', answerController.deleteAll);
module.exports = router;