const mongoose = require('mongoose');

const kittySchema = new mongoose.Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model('Kitten', kittySchema);
