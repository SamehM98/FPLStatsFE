import { Routes, Route } from 'react-router-dom';
import Fixtures from './components/Fixtures';
import './App.css';
import TeamStats from './components/TeamStats';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/season/team" element={<TeamStats gameweekRange={false} />} />
      <Route path="/gameweeks/team" element={<TeamStats gameweekRange />} />
    </Routes>
  );
}

export default App;
