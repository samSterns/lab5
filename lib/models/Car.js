const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String, 
    required: true,
  },
  automatic: {
    type: Boolean, 
    required: true
  }
  
});
  
  
module.exports = mongoose.model('Car', schema);
