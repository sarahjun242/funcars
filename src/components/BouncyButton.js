import { useState } from 'react';

function BouncyButton({ onClick, children, style = {} }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        fontFamily: "'Anonymous Pro', monospace",
        fontSize: '15px',
        padding: '12px 24px',
        borderRadius: '12px',
        backgroundColor: isPressed ? '#f0f0f0' : 'white',
        border: '1px solid black',
        transform: isPressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.1s ease, background-color 0.1s ease',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '300px',
        ...style // allow overrides
      }}
    >
      {children}
    </button>
  );
}

export default BouncyButton;
