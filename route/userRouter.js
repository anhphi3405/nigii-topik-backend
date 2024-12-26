const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/user/create', userController.createUser);

router.post('/user/login', userController.postCheckUser);

router.get('/user/:username', userController.getUser);

module.exports = router;