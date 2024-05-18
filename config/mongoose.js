// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/MyChatSphere');

// const db = mongoose.connection;

// db.on('error', console.log.bind(console,'error connecting to db'));

// db.once('open', function(){
//     console.log('Successfully connected to database!');
// })

// module.exports = db;


const mongoose = require('mongoose');

// Connection URI for MongoDB Atlas
const uri = 'mongodb+srv://tejasaher9623:5b3Q0cMcAGCKSD8O@production-cluster.hvonmpn.mongodb.net/MyChatSphere?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'Error connecting to db'));

db.once('open', function() {
  console.log('Successfully connected to database!');
});

module.exports = db;
