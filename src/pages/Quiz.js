import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BouncyButton from '../components/BouncyButton';

// Define API URL dynamically
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Quiz() {
  const { level } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5.0);
  const [loading, setLoading] = useState(true);

  const playerName = localStorage.getItem('playerName') || 'Player';

  // Fetch questions dynamically based on level
  useEffect(() => {
    console.log('API URL:', API_URL);
    console.log(`Fetching from: ${API_URL}/api/questions?level=${level}`);
    
    fetch(`${API_URL}/api/questions?level=${level}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading questions:", err);
        setLoading(false);
      });
  }, [level]);

  // Timer countdown logic
  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = parseFloat((prev - 0.1).toFixed(1));
        if (next <= 0) {
          clearInterval(interval);
          endGame(); // End the game when timer hits 0
          return 0;
        }
        return next;
      });
    }, 100); // Updates every 100ms

    return () => clearInterval(interval);
  }, [questions]);

  // Handle end of game and submit score
  const endGame = () => {
    fetch(`${API_URL}/api/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: playerName, score, level })
    })
      .then(() => {
        navigate(`/leaderboard/${level}?score=${score}`);
      })
      .catch((err) => {
        console.error('Failed to save score:', err);
        navigate(`/leaderboard/${level}?score=${score}`);
      });
  };

  // Handle answer selection
  const handleAnswer = (isCorrect) => {
    if (!isCorrect) {
      endGame(); // Wrong answer = end game immediately
      return;
    }

    setScore(score + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimer(5.0); // Reset timer
    } else {
      endGame(); // End game when all questions are answered
    }
  };

  if (loading) return <h3 style={{ textAlign: 'center' }}>Loading questions...</h3>;
  if (questions.length === 0) return <h3 style={{ textAlign: 'center' }}>No questions found.</h3>;

  const current = questions[currentIndex];

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'normal',
          marginBottom: '20px'
        }}
      >
        {timer.toFixed(1)}s
      </p>

      <img
        src={current.image}
        alt="Car"
        style={{
          width: '260px',
          height: '260px',
          borderRadius: '24px',
          objectFit: 'cover',
          objectPosition: 'center',
          marginBottom: '32px',
          backgroundColor: '#f2f2f2',
          border: '1px solid #ccc'
        }}
      />

      <h3
        style={{
          fontWeight: 'normal',
          fontSize: '16px',
          marginBottom: '32px',
          marginTop: '-20px'
        }}
      >
        {current.text}
      </h3>

      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {current.options.map((option, i) => (
          <BouncyButton
            key={i}
            onClick={() => handleAnswer(option.isCorrect)}
            style={{
              fontSize: '16px',
              padding: '8px 12px',
              minHeight: '36px',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            {option.text}
          </BouncyButton>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
