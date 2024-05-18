// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/MyChatSphere');

// const db = mongoose.connection;

// db.on('error', console.log.bind(console,'error connecting to db'));

// db.once('open', function(){
//     console.log('Successfully connected to database!');
// })

// module.exports = db;


const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function() {
  console.log('Successfully connected to database!');
});

module.exports = db;
