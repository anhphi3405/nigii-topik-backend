const router = require('express').Router();
const examSessionController = require('../controller/examSessionController');

router.post('/create', examSessionController.createExamSession);
router.put('/update/:id', examSessionController.updateExamSession);
router.delete('/delete/:id', examSessionController.deleteExamSession);
router.delete('/delete_all', examSessionController.deleteAll);

module.exports = router;