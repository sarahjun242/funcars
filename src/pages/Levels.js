import { useNavigate } from 'react-router-dom';


function Levels() {
  const navigate = useNavigate();

  const levels = [
    {
      name: 'Easy',
      level: 'easy',
      description: 'Recent popular models (2010 – now)'
    },
    {
      name: 'Medium',
      level: 'medium',
      description: 'Iconic models & classic cars (1990 – 2000s)'
    },
    {
      name: 'Hard',
      level: 'hard',
      description: 'Rare vintage & racing cars'
    }
  ];

  const handleClick = (level) => {
    navigate(`/enter-name/${level}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Anonymous Pro', monospace",
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '30px' }}>Levels</h2>

        {levels.map((level, index) => (
          <div
            key={index}
            onClick={() => handleClick(level.level)}
            style={{
              display: 'block',
              textDecoration: 'none',
              marginBottom: '30px',
              color: 'inherit',
              transition: 'transform 0.2s ease, color 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0px)'}
          >
            <div>
              <div style={{ fontSize: '16px', marginBottom: '4px' }}>
                {level.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {level.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Levels;
