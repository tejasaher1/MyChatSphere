const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/usersController');

router.post('/create_user', userController.createUser);

router.get('/create_Account_Page', userController.getCreateAccountPage);

router.post('/checkAccount', passport.authenticate(     // Passport.js uses the configured authentication strategy (in this case, passport-local) to authenticate the user based on the credentials provided in the request (e.g., username and password).
    'local',
    {failureRedirect:'/'},
) ,userController.signIn);

router.get('/profile', passport.checkAuthentication ,userController.profile);

router.get('/sign-out', userController.signOut)

router.get('/profileUpdatePage', passport.checkAuthentication, userController.profileUpdatePage);

router.post('/profile_update',  passport.checkAuthentication, userController.updateProfile);


module.exports = router;