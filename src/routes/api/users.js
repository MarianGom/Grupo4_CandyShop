const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');


router.get('/usuarios', usersAPIController.allUsers);
router.get('/usuarios/:id', usersAPIController.details);

module.exports = router;