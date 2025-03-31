import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import BouncyButton from '../components/BouncyButton';

// Format date as MM/DD/YY
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
}

// ✅ Define API URL dynamically for local/production
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Leaderboard() {
  const { level } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [scores, setScores] = useState([]);
  const playerName = localStorage.getItem('playerName');
  const playerScore = parseInt(new URLSearchParams(location.search).get('score'), 10);

  useEffect(() => {
    console.log('Fetching from:', `${API_URL}/api/scores?level=${level}`);

    fetch(`http://localhost:5000/api/scores?level=${level}&score=${playerScore}&name=${playerName}`)
      .then((res) => res.json())
      .then((data) => {
        let updatedScores = [...data];

        // Check if player's score is already in the top 10
        const isInTop10 = updatedScores.some(
          (entry) => entry.name === playerName && entry.score === playerScore
        );

        // If player's score is NOT in the top 10, add it to the bottom
        if (!isInTop10) {
          updatedScores.push({
            name: playerName,
            score: playerScore,
            date: new Date().toISOString(),
          });
        }

        setScores(updatedScores);
      })
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, [level, playerName, playerScore]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        paddingTop: '240px',
        fontFamily: "'Anonymous Pro', monospace",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Centered content container */}
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
        }}
      >
        {/* Header */}
        <h2
          style={{
            fontSize: '20px',
            marginBottom: '30px',
            textAlign: 'left',
          }}
        >
          Leaderboard ({level.charAt(0).toUpperCase() + level.slice(1)})
        </h2>

        {/* Score List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          {scores.map((entry, i) => {
            const isCurrent =
              entry.name === playerName && entry.score === playerScore;

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: isCurrent ? 'bold' : 'normal',
                  fontSize: '15px',
                }}
              >
                <div style={{ display: 'flex', gap: '10px' }}>
                  <span>{formatDate(entry.date)}</span>
                  <span>{entry.name}</span>
                </div>
                <span>{entry.score}</span>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <BouncyButton
          onClick={() => navigate(`/quiz/${level}`)}
          style={{ marginBottom: '12px' }}
        >
          Play Again
        </BouncyButton>

        <BouncyButton onClick={() => navigate(`/levels`)}>
          Exit Level
        </BouncyButton>
      </div>
    </div>
  );
}

export default Leaderboard;
