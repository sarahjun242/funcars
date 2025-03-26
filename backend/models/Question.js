const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  level: String,
  image: String,
  text: String,
  options: [
    {
      text: String,
      isCorrect: Boolean
    }
  ]
});

module.exports = mongoose.model('Question', questionSchema);
