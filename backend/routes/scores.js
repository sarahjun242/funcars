const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// POST /api/scores → Save a new score
router.post('/', async (req, res) => {
  console.log('Incoming score:', req.body); 
  
  const { name, score, level } = req.body;

  if (!name || !level || typeof score !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newScore = new Score({ name, score, level });
    await newScore.save();
    res.status(201).json({ message: 'Score saved!', newScore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/scores?level=easy → Get top scores for a level
router.get('/', async (req, res) => {
  const level = req.query.level;
  try {
    const topScores = await Score.find({ level })
      .sort({ score: -1, date: -1 })
      .limit(10);
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
