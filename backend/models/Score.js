const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  name: String,
  score: Number,
  level: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);
