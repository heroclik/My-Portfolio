const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

// get all users
router.get('/getall', userController.getallusers);

// get all users
router.get('/getuser/:user_id', userController.getUserById);


module.exports = router;