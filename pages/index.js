import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";


const movie_api = `https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&page=1`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("popular");

  const getData = (typeSearch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${typeSearch}?api_key=04c35731a5ee918f014970082a0088b1&page=1`
    )
      .then((res) => res.json())
      .then((res) => setMovies(res.results));
  };

  useEffect(() => {
    getData(type);
  }, [type]);


  return (
    <div className="relative">
      <Head>
        <title>Movie App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hide">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1000}
          interval={5000}
          infiniteLoop={true}
          showStatus={false}
          showIndicators={false}
          showArrows={true}
        >
          {movies?.slice(0,10).map((movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <div className="poster-image">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="posterImage__overlay container">
                <div className="posterImage__title">{movie.title}</div>
                <div className="posterImage__release">
                  {movie.release_date}
                  <span className="posterIMage__rating">
                    {" "}
                    {movie.vote_average} <AiFillStar />
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="movie-container">
        {movies?.map((movie) => {
          return <MovieCard {...movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
}
