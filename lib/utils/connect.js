const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('We connected!');
  });

  mongoose.connection.openUri('error', () => {
    console.error('We cannot connect');
  });
}

module.exports = connect; 
