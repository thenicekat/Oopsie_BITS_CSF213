import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from './Components/Login';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
