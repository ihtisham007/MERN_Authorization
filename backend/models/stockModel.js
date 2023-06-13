const mongoose = require('mongoose');

// Define the stock schema
const stockSchema = new mongoose.Schema({
  variant: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
});

// Create the stock model
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
