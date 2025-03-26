import { Link } from 'react-router-dom';
import BouncyButton from '../components/BouncyButton';

function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Anonymous Pro', monospace",
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '32px', fontWeight: 'normal' }}>
        Guess The Car
      </h1>

      <Link to="/levels" style={{ width: '100%', maxWidth: '200px' }}>
        <BouncyButton>
          Choose Level
        </BouncyButton>
      </Link>
    </div>
  );
}

export default Home;
