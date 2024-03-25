const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');
 
router.get('/users/', usersAPIController.allUsers);
router.get('/users/:id', usersAPIController.details);

router.put('/users/block/:id', usersAPIController.block);
router.put('/users/unblock/:id', usersAPIController.unblock);

module.exports = router;