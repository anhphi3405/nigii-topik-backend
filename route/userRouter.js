const router = require('express').Router();


const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin');

router.get('/',auth.verifyToken ,   userController.getAllUsers);
router.delete('/:id', checkAdmin, userController.deleteUser);

module.exports = router;