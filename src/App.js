import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './Pages/home/Home';
import MovieList from './components/movieList/MovieList';
import Movie from './Pages/movieDetail/Movie';
import Footer from './components/header/Footer';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/*" element={<h1> error</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
