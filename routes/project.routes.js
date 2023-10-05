const express = require('express');
const router = express.Router();
const projectController = require('../controller/project.controller.js');

/**
 * @swagger
 * /project/getproject:
 *   get:
 *     summary: Get a list of projects
 *     description: Retrieve a list of all projects.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/getproject', projectController.getallproject);

/**
 * @swagger
 * /project/getproject/{project_id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve a project by their ID.
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: ID of the project to retrieve
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
router.get('/getproject/:project_id', projectController.getprojectById);

/**
 * @swagger
 * /project/newproject:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_name:
 *                 type: string
 *               description:
 *                 type: string
 *               owner_id:
 *                 type: integer
 *             required:
 *               - project_name
 *               - description
 *               - owner_id
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request (e.g., missing or invalid input data)
 *       500:
 *         description: Internal server error
 */
router.post('/newproject', projectController.newproject);


module.exports = router;