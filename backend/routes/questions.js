const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /api/questions?level=easy
router.get('/', async (req, res) => {
  const level = req.query.level;
  console.log("Fetching questions for level:", level); 
  try {
    const questions = await Question.find({ level });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
