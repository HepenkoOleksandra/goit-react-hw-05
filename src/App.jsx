import { Routes, Route } from "react-router-dom";
import MoviesPage from './pages/MoviesPage/MoviesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import HomePage from './pages/HomePage/HomePage';
import Navigation from './components/Navigation/Navigation';

function App() {
  
  return (
    <>
      <Navigation/>
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId/*' element={<MovieDetailsPage/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </main>
    </>
  )
}

export default App;