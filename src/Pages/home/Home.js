import React, { useEffect, useState } from 'react'
import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../../components/movieList/MovieList';

const Home = () => {
    const [popularMovies, setPopularMovie] = useState([]);

//      useEffect(() => {
//     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=29511babc8ba04b1f13e8ed7d71eeb56&language=en-US`)
//         .then(res => res.json())
//         .then(data => {
//             // Do something with the fetched data, such as updating state
//             console.log(data.results);
//         });
// }, []);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=29511babc8ba04b1f13e8ed7d71eeb56&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setPopularMovie(data.results);
            })
            .catch(error => {
                console.error('Error fetching popular movies:', error);
            });
    }, []);

    // console.log(setPopularMovie);

    return (
        <div className="poster">
        <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
        >
             {popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
        </Carousel>
        <MovieList/>
    </div>
);
}

export default Home;
