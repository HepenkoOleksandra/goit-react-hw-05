import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation/Navigation';
import Loader from "./components/Loader/Loader";

// import MoviesPage from './pages/MoviesPage/MoviesPage';
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
// import HomePage from './pages/HomePage/HomePage';

const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

function App() {
  
  return (
    <>
      <Navigation />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/movies' element={<MoviesPage />} />
            <Route path='/movies/:movieId/*' element={<MovieDetailsPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;