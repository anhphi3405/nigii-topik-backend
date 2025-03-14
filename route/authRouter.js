const authController = require('../controller/authController');

const router = require('express').Router();

const auth = require('../middleware/auth');

router.post('/register', authController.registerUser);

router.post('/registerByEmail', authController.registerByEmail);

router.post('/login', authController.loginUser);

router.post('/refresh', authController.requestRefreshToken);

router.post('/logout',auth.verifyToken ,authController.userLogout);

router.post('/checkcode', authController.checkCode);

router.post('/loginByEmail', authController.loginByEmail);

router.post('/checkLoginCode', authController.checkLoginCode);

module.exports = router;