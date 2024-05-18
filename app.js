const express = require('express');
const port = 8000;
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flashMessage = require('connect-flash');
const flashMiddleware = require('./config/customMiddlewareMessage');
require('dotenv').config();     // Load environment variables from .env file
const uri = process.env.MONGODB_URI;

//DB connection - 
const db = require('./config/mongoose');
const User = require('./models/users');

//Session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-authentication');
const MongoStore  = require('connect-mongo');

//EJS View Engine - 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//Middleware - 
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayout);

//Setting express-session as middleware to encryption and decryption - 
//Session management - 
app.use(session({                       // This code will generate unique string value(id) and store it in server side and in client side through session cookie
    name: 'MyChatSphere',
    secret:'abc',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore ({
        mongoUrl: uri,
        mongooseConnection : db,
        autoRemove : 'disable'
    }, function(error){
        console.log(error || "connect mongo-db setup is ok");
    })
}));
app.use(passport.initialize()); // This middleware is used to initialize Passport.js. It adds Passport's methods and properties to the req object.
app.use(passport.session()); // This middleware use to integrate Passport with session management.
app.use(passport.setAuthenticatedUser); 

//Flash Message - 
app.use(flashMessage());
app.use(flashMiddleware.setFlash);

//Routes - 
app.use('/', require('./routes/EntryRoute'));

 
app.listen(port, function(error){
    if(error){
        console.log(`Error in launching application ${error}`);
        return;
    }

    console.log(`The application is up and running fine on port - ${port}!!!`);
})