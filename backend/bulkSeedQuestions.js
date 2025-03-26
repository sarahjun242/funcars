const mongoose = require('mongoose');
const Question = require('./models/Question');

const MONGO_URI = 'mongodb+srv://junsarah3:Bayside0626@creeper.bl2bo.mongodb.net/?retryWrites=true&w=majority&appName=Creeper';

const questions = [
  {
    level: 'easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Honda_Civic_Hatchback.jpg/640px-Honda_Civic_Hatchback.jpg',
    text: 'What car is this?',
    options: [
      { text: 'Honda Accord', isCorrect: false },
      { text: 'Honda Civic', isCorrect: true },
      { text: 'Mazda 3', isCorrect: false },
      { text: 'Hyundai Elantra', isCorrect: false }
    ]
  },
  {
    level: 'hard',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Lamborghini_Countach_LP400_%281976%29.jpg/640px-Lamborghini_Countach_LP400_%281976%29.jpg',
    text: 'Name this vintage supercar.',
    options: [
      { text: 'Ferrari F40', isCorrect: false },
      { text: 'Lamborghini Countach', isCorrect: true },
      { text: 'De Tomaso Pantera', isCorrect: false },
      { text: 'Jaguar XJ220', isCorrect: false }
    ]
  },
  // 👉 Add 100+ more questions here
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Question.insertMany(questions);
    console.log('🌱 Questions inserted successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Seeding error:', err));
