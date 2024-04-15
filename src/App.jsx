import clsx from 'clsx';

// import { useEffect, useState } from 'react'
import css from './App.module.css';
// import { getTrendingMovies } from './apiService/movies';
// import Movies from './components/Movies';

import { Routes, Route, NavLink } from "react-router-dom"
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailsPage from './pages/MovieDetailsPage';

const navLinkClassActive = ({ isActive }) =>
  // clsx(css.navLink, { [css.active]: isActive });
clsx(css.navLink, isActive && css.active);


function App() {
  // const [movies, setMovies] = useState([]);
  // console.log(movies);

  // useEffect(() => {
  //   async function fetchMovies() {
  //     const data = await getTrendingMovies();
  //     console.log(data);
  //     setMovies(data);
  //   } 
  //   fetchMovies();
  // }, [])

  return (
    <div>
      <header>
        <nav className={css.nav}>
        <NavLink className={navLinkClassActive} to="/">Home</NavLink>
        <NavLink className={navLinkClassActive} to="/movies">Movies</NavLink>
        <a href="https://www.edu.goit.global/uk/learn/13328540/22355212/23028667/lessons"
            target="_blank" rel="noopener noreferrer">My page</a>
          </nav>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId/*' element={<MovieDetailsPage/>} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </main>
    </div>
  )
}

// adult: false
// backdrop_path: "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg"
// id: 1011985
// media_type: "movie"
// original_title: "Kung Fu Panda 4"
// overview: "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past."
// popularity
// : 
// 3561.356
// poster_path: "/f7QBvIzoWSJw3jWPGnZBc5vwQ0l.jpg"
// release_date: "2024-03-02"
// title: "Kung Fu Panda 4"
// video: false
// vote_average: 7.116
// vote_count: 945

export default App
