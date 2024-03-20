const express = require('express');
const router = express.Router();

router.get('/usuarios', usersAPIController.allUsers);
router.get('/usuarios/:id', usersAPIController.details);

module.exports = router;