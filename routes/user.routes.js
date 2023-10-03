const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

// get all users
router.get('/getuser', userController.getallusers);

// get users by id
router.get('/getuser/:user_id', userController.getUserById);

// update user
// router.put('/update/:user_id', userController.updateById);

module.exports = router;