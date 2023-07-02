import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from './components/Container';
import Home from './pages/home'
import Breed from './pages/breed'
import { CatProvider } from './contexts/CatContext';
import { ErrorProvider } from './contexts/ErrorContext';
import ErrorMessage from './components/Error';

const App = () => {
  return (
    <div className="App">
      <ErrorProvider>
        <ErrorMessage />
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
      </ErrorProvider>
    </div>
  );
}

export default App;
