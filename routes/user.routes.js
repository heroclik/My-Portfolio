const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller.js');

/**
 * @swagger
 * /user/getuser:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/getuser', userController.getallusers);

/**
 * @swagger
 * /user/getuser/{user_id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/getuser/:user_id', userController.getUserById);

// update user
// router.put('/update/:user_id', userController.updateById);

module.exports = router;