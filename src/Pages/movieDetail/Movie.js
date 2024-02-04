import React, { useEffect, useState } from "react";
import "./Movie.css";
import { useParams } from "react-router-dom";
import Cards from "../../components/card/Card";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [similarMovie, setSimilarMovie] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getData = () => {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=29511babc8ba04b1f13e8ed7d71eeb56&language=en-US`)
                .then((res) => res.json())
                .then((data) => setMovie(data))
                .catch((error) => console.error('Error fetching movie details:', error));
        };

        getData();
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const getData2 = () => {
            fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=29511babc8ba04b1f13e8ed7d71eeb56&language=en-US`)
                .then((res) => res.json())
                .then((data) => setSimilarMovie(data.results))
                .catch((error) => console.error('Error fetching similar movies:', error));
        };

        getData2();
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="" />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="" />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {currentMovieDetail && currentMovieDetail.genres
                                ? currentMovieDetail.genres.map((genre) => (
                                      <span className="movie__genre" key={genre.id}>
                                          {genre.name}
                                      </span>
                                  ))
                                : ""}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {currentMovieDetail && currentMovieDetail.homepage && (
                    <a href={currentMovieDetail.homepage} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <p>
                            <span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span>
                        </p>
                    </a>
                )}
                {currentMovieDetail && currentMovieDetail.imdb_id && (
                    <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                        <p>
                            <span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span>
                        </p>
                    </a>
                )}
            </div>
            <div className="movie__heading"> Similar Movies </div>
            <div className="movie__list">
                <div className="list__cards">
                    {similarMovie.map((movie) => (
                        <Cards movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Movie;
