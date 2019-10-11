const express = require('express');
const router = express.Router();
const signUpVerify = require('./verifySignUp');

const controller = require('../controller/controller');

// User Info
router.get('/profile', controller.userinfo);

// User Info
router.get('/profile/:p_code', controller.oneuserinfo);

// User Signup
router.post('/signup', [signUpVerify.checkAlreadyExist], controller.signup);

module.exports = router;