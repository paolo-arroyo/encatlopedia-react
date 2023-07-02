import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Breed from './pages/breed'

// Type Declarations (Breed Data, Cat Images)
export type BreedType = {
  id: string,
  name: string,
  temperament: string,
  origin: string,
  country_code: string,
  life_span: string,
  description: string,
  indoor: boolean,
  wikipedia_url: string,
  weight: {
      imperial: string,
      metric: string
  },
  scores: {
      adaptability: number,
      affection_level: number,
      child_friendly: number,
      dog_friendly: number,
      stranger_friendly: number,
      energy_level: number,
      grooming: number,
      health_issues: number,
      intelligence: number,
      shedding_level: number,
      social_needs: number,
  }
}


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Breed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
