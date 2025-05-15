// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';


const queryClient = new QueryClient(); // React Query için client oluştur

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Navbar /> {/* Eklendi */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
