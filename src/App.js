import { Routes, Route } from 'react-router-dom';
import Fixtures from './components/Fixtures';
import './App.css';
import Stats from './components/Stats';
import { positions } from './helpers/constants';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/gameweeks">
        {
          positions.map(position => <Route path={position.path} element={<Stats position={position.id} gameweekRange playerStats />} />)
        }
        <Route path="teams" element={<Stats gameweekRange />} />
      </Route>
      <Route path="/season">
        {
          positions.map(position => <Route path={position.path} element={<Stats position={position.id} playerStats />} />)
        }
        <Route path="teams" element={<Stats />} />
      </Route>
    </Routes>
  );
}

export default App;
