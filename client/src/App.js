import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Home from './pages/Home';
import Nav from './components/Nav/Nav';

const App = () => {
  return (
    <div className="bg-stone-900 text-stone-200 h-screen w-screen">
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
