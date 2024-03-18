const express = require('express');
const router = express.Router();

router.get('/', usersAPIController.list);

module.exports = router;