const mongoose = require('mongoose');

const shirtSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  playerNumber: {
    type: Number,
    required: true
  },
  playerName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Shirt', shirtSchema);
