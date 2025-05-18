// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExerciseDetail from './pages/ExerciseDetail';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 20, 
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
        </Router>
      </ErrorBoundary>
      
    </QueryClientProvider>
  );
}

export default App;
