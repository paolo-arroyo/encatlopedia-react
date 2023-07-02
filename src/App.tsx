import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Home from './pages/home'
import Breed from './pages/breed'
import { CatProvider } from './contexts/CatContext';

const App = () => {
  return (
    <div className="App">
      <Container>
        <Router>
        <CatProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Breed />} />
          </Routes>
        </CatProvider>
        </Router>
      </Container>
    </div>
  );
}

export default App;
