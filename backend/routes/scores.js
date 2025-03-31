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
  const playerScore = req.query.score ? parseInt(req.query.score) : null;
  const playerName = req.query.name || '';

  try {
    let topScores = await Score.find({ level })
      .sort({ score: -1, date: -1 })
      .limit(10); // ✅ Show top 10 by default

    // If player's score is lower than lowest score on leaderboard
    if (playerScore !== null && topScores.length === 10) {
      const lowestScore = topScores[topScores.length - 1].score;
      if (playerScore < lowestScore) {
        // Add the player's score at the bottom
        topScores.push({
          name: playerName,
          score: playerScore,
          level: level,
          date: new Date().toISOString()
        });
      }
    }

    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
