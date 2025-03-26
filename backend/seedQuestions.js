const mongoose = require('mongoose');
const Question = require('./models/Question');

const MONGO_URI = 'mongodb+srv://junsarah3:Bayside0626@creeper.bl2bo.mongodb.net/?retryWrites=true&w=majority&appName=Creeper';

const seedData = [
  // 🔹 Easy Questions
  {
    level: 'easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2021_Toyota_Corolla_Design_HEV_CVT_1.8_Front.jpg/640px-2021_Toyota_Corolla_Design_HEV_CVT_1.8_Front.jpg',
    text: 'What car is this?',
    options: [
      { text: 'Honda Accord', isCorrect: false },
      { text: 'Toyota Corolla', isCorrect: true },
      { text: 'Mazda 3', isCorrect: false },
      { text: 'Hyundai Elantra', isCorrect: false }
    ]
  },
  {
    level: 'easy',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Tesla_Model_3_parked%2C_front_driver_side.jpg/640px-Tesla_Model_3_parked%2C_front_driver_side.jpg',
    text: 'Which electric car is this?',
    options: [
      { text: 'Tesla Model 3', isCorrect: true },
      { text: 'Chevy Bolt', isCorrect: false },
      { text: 'Nissan Leaf', isCorrect: false },
      { text: 'Lucid Air', isCorrect: false }
    ]
  },

  // 🔸 Medium Questions
  {
    level: 'medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Toyota_Supra_Mk4_0003.jpg/640px-Toyota_Supra_Mk4_0003.jpg',
    text: 'What model is this iconic car?',
    options: [
      { text: 'Mazda RX-7', isCorrect: false },
      { text: 'Toyota Supra Mk4', isCorrect: true },
      { text: 'Nissan 300ZX', isCorrect: false },
      { text: 'Acura NSX', isCorrect: false }
    ]
  },
  {
    level: 'medium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Porsche_911_Carrera_RS_2.7.jpg/640px-Porsche_911_Carrera_RS_2.7.jpg',
    text: 'Identify this classic car:',
    options: [
      { text: 'Porsche 944', isCorrect: false },
      { text: 'Ferrari 328', isCorrect: false },
      { text: 'Porsche 911 Carrera RS', isCorrect: true },
      { text: 'BMW M1', isCorrect: false }
    ]
  },

  // 🔺 Hard Questions
  {
    level: 'hard',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1967_Ford_GT40_Mk_IV.jpg/640px-1967_Ford_GT40_Mk_IV.jpg',
    text: 'Which racing legend is this?',
    options: [
      { text: 'Ford GT40', isCorrect: true },
      { text: 'Ferrari 250 GTO', isCorrect: false },
      { text: 'Lamborghini Miura', isCorrect: false },
      { text: 'Porsche 917', isCorrect: false }
    ]
  },
  {
    level: 'hard',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Jaguar_XKSS_-_Flickr_-_exfordy_%281%29.jpg/640px-Jaguar_XKSS_-_Flickr_-_exfordy_%281%29.jpg',
    text: 'Name this rare vintage car:',
    options: [
      { text: 'Jaguar XKSS', isCorrect: true },
      { text: 'Aston Martin DB5', isCorrect: false },
      { text: 'Maserati 3500 GT', isCorrect: false },
      { text: 'Mercedes 300SL', isCorrect: false }
    ]
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    await Question.deleteMany(); // Optional: clear old data
    await Question.insertMany(seedData);
    console.log('🌱 Quiz questions seeded!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Seeding error:', err));
