const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/',homeController.home);

router.use('/users', require('./usersRoute'));

router.use('/post', require('./postRoute'));

router.use('/comment', require('./commentRoute'));


module.exports = router;