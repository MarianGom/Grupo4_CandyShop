var express = require('express');
const usersController = require('../controllers/usersController');
var router = express.Router();

/* GET users page. */
router.get('/', usersController.login)


router.get('/register', usersController.add)

module.exports = router;
