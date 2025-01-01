const authController = require('../controller/authController');

const router = require('express').Router();

const auth = require('../middleware/auth');

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/refresh', authController.requestRefreshToken);

router.post('/logout',auth.verifyToken ,authController.userLogout);

module.exports = router;