require('dotenv').config();     // Load environment variables from .env file

const mongoose = require('mongoose');
 

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
