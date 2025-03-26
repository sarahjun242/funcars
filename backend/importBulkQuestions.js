const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Question = require('./models/Question');

const MONGO_URI = 'mongodb+srv://junsarah3:Bayside0626@creeper.bl2bo.mongodb.net/car-quiz?retryWrites=true&w=majority&appName=Creeper'; // 🔁 replace with your MongoDB URI

// Load JSON file
const questionsFile = path.join(__dirname, 'quiz_questions_bulk.json');
const questions = JSON.parse(fs.readFileSync(questionsFile, 'utf-8'));

// Connect and insert
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Question.insertMany(questions);
    console.log(`🌱 Successfully inserted ${questions.length} questions!`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error inserting questions:', err);
  });
