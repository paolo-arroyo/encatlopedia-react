import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Home from './pages/home'
import Breed from './pages/breed'

const App = () => {
  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Breed />} />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
