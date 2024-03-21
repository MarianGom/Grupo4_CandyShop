const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');
 
router.get('/usuarios', usersAPIController.allUsers);
router.get('/usuarios/:id', usersAPIController.details);

router.put('/usuarios/block/:id', usersAPIController.block);
router.put('/usuarios/unblock/:id', usersAPIController.unblock);

module.exports = router;