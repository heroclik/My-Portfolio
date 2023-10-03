const express = require('express');
const router = express.Router();
const projectController = require('../controller/project.controller.js');

// get all project
router.get('/getproject', projectController.getallproject);

// get project by id
router.get('/getproject/:project_id', projectController.getprojectById);

module.exports = router;