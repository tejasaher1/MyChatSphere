const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const passport = require('../config/passport-local-authentication');

router.post('/createPost', passport.checkAuthentication ,postController.createPost);

router.get('/destroyPost', passport.checkAuthentication ,postController.destroyPost);


module.exports = router;