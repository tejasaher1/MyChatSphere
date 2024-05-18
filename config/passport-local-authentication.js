const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const User = require('../models/users');

passport.use( new passportLocal({
    usernameField:'email' 
}, function(email,password,done){
    User.findOne({email:email})
    .then(function(user){
        if(!user || user.password != password){
            console.log('User is not present');
            return done(null, false);
        }

        return done(null,user);
    })
    .catch(function(error){
        console.log('Error', error);
        return done(error);
    })
}));

// This will store user data like user-id in session cookie 
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// This function will use to extract user-id from session cookie
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then(function(user){
        if(!user){
            console.log("User not found");
            return done(null, false);
        }
        return done(null,user);
    })
    .catch(function(error){
        return done(error);
    })
})


passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;