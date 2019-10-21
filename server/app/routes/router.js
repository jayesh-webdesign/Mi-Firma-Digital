const express = require('express');
const router = express.Router();
const verifyUser = require('./verifyUser');
const verifyToken = require('./verifyToken');

const controller = require('../controller/controller');


// User Info
router.post('/profile', verifyToken.isTokenValid, controller.oneuserinfo);

// User Signup
router.post('/signup', [verifyToken.isTokenValid, verifyUser.checkUserAlreadyExist], controller.signup);

// User profile update
router.put('/update', verifyToken.isTokenValid, controller.update);

// Add Purchase code
router.post('/purchasecode', [verifyUser.checkPurchaseCodeAlreadyExist], controller.addpurchasecode);

module.exports = router;