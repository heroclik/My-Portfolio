const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller.js');

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account by providing user information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registration successful. Returns the user's ID.
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *       500:
 *         description: Internal server error
 */

router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by providing valid credentials (username or email and password).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Authentication successful. Returns a JWT token.
 *       401:
 *         description: Authentication failed. Invalid username or password.
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

module.exports = router;