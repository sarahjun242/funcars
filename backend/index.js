const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());

const questionRoutes = require('./routes/questions');
const scoreRoutes = require('./routes/scores');

app.use('/api/questions', questionRoutes);
app.use('/api/scores', scoreRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://junsarah3:Bayside0626@creeper.bl2bo.mongodb.net/car-quiz?retryWrites=true&w=majority&appName=Creeper')
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
});


