import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Levels from './pages/Levels';
import EnterName from './pages/EnterName';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/enter-name/:level" element={<EnterName />} />
        <Route path="/quiz/:level" element={<Quiz />} />
        <Route path="/leaderboard/:level" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
