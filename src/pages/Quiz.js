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
  const [feedback, setFeedback] = useState({ text: '', color: '', animate: false });

  const successAudio = new Audio('../sounds/success.mp3');
  const errorAudio = new Audio('../sounds/error.mp3');

  const playerName = localStorage.getItem('playerName') || 'Player';

  // 🎯 Progress bar percentage
  const progressPercentage = (timer / 5) * 100;

  // ✅ Fetch questions dynamically based on level
  useEffect(() => {
    console.log('API URL:', API_URL);
    console.log(`Fetching from: ${API_URL}/api/questions?level=${level}`);

    fetch(`${API_URL}/api/questions?level=${level}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading questions:', err);
        setLoading(false);
      });
  }, [level]);

  // ⏱️ Timer countdown logic
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

  // 🚀 Handle end of game and submit score
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

  // 🎯 Handle answer selection
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      successAudio.play();
      setFeedback({color: 'green', animate: true });
    } else {
      errorAudio.play();
      setFeedback({color: 'red', animate: true });
      if (navigator.vibrate) {
        navigator.vibrate(200); // Vibration for mobile
      }
    }

    // ⏳ Wait for feedback to finish before proceeding
    setTimeout(() => {
      setFeedback({ text: '', color: '', animate: false });

      if (!isCorrect) {
        endGame(); // End game after wrong answer
      } else if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimer(5.0); // Reset timer
      } else {
        endGame(); // Game over after last question
      }
    }, 1200); // Show feedback for 1.2 seconds
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
        alignItems: 'center',
      }}
    >
      {/* ✅ Feedback section */}
      {feedback.text && (
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: feedback.color,
            marginBottom: '20px',
            transition: 'transform 0.2s ease',
          }}
        >
          {feedback.text}
        </div>
      )}

      {/* ⏱️ Timer display */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 'normal',
          marginBottom: '20px',
        }}
      >
        {timer.toFixed(1)}s
      </p>

      {/* ⏳ Progress Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor:
              progressPercentage > 50
                ? '#4caf50'
                : progressPercentage > 20
                ? '#ffc107'
                : '#f44336',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* 🖼️ Car Image */}
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
          border: '1px solid #ccc',
        }}
      />

      {/* ❓ Question */}
      <h3
        style={{
          fontWeight: 'normal',
          fontSize: '16px',
          marginBottom: '32px',
          marginTop: '-20px',
        }}
      >
        {current.text}
      </h3>

      {/* 🔘 Answer Buttons */}
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
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
              overflow: 'hidden',
              backgroundColor:
                feedback.animate && option.isCorrect
                  ? '#d4edda'
                  : feedback.animate && !option.isCorrect
                  ? '#f8d7da'
                  : 'white',
              border: feedback.animate
                ? option.isCorrect
                  ? '2px solid #28a745'
                  : '2px solid #dc3545'
                : '1px solid black',
              transform: feedback.animate && !option.isCorrect ? 'translateX(-3px)' : 'none',
              transition: 'all 0.3s ease',
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
