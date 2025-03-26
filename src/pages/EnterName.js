import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BouncyButton from '../components/BouncyButton'; 


function EnterName() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { level } = useParams();

  useEffect(() => {
    console.log("➡️ Loaded EnterName screen for level:", level);
  }, [level]);

  const handleSubmit = () => {
    if (name.trim() === '') return;
    localStorage.setItem('playerName', name.trim());
    navigate(`/quiz/${level}`);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Anonymous Pro', monospace",
      padding: '20px'
    }}>
      <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>
        Please enter your name
      </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="type your name here"
        style={{
          padding: '10px',
          fontSize: '16px',
          fontFamily: "'Anonymous Pro', monospace",
          border: '1px solid black',
          borderRadius: '8px',
          marginBottom: '20px',
          width: '80%',
          maxWidth: '300px'
        }}
      />

      <BouncyButton 
      onClick={handleSubmit}
      style = {{
        padding: '12px 24px', 
        fontSize: '14px', 
        borderRadius: '8px', 
        maxWidth: '160px', 
        width: '100%', 
      }}
      >
        Done
      </BouncyButton>
      </div>
  );
}

export default EnterName;
