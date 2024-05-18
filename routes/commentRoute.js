const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const passport = require('passport');

router.post('/createComment', passport.checkAuthentication, commentController.createComment);

router.get('/destroyComment', passport.checkAuthentication ,commentController.destroyComment);

module.exports = router;