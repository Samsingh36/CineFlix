import React, { useState,useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './Pages/home/Home';
import MovieList from './components/movieList/MovieList';
import Movie from './Pages/movieDetail/Movie';
import Footer from './components/header/Footer';
function App() {
  
//   useEffect(() => {
//     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=29511babc8ba04b1f13e8ed7d71eeb56&language=en-US`)
//         .then(res => res.json())
//         .then(data => {
//             // Do something with the fetched data, such as updating state
//             console.log(data.results);
//         });
// }, []);
  
  return (
    <div className='App'>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="movie/:id" element={<Movie/>} /> 
          <Route path="movies/:type" element={<MovieList/>} /> 
          <Route path="/*" element={<h1> error</h1>} />  
          
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
