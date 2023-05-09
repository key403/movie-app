import React from "react";
import MovieCard from "../../components/MovieCard";

const categoryPage = ({results, cat}) => {
  if (cat === "top_rated") cat = "top rated"
  return (
    <div>
      <h3 className="cat-title">{cat} movies</h3>

      <div className="movie-container">
        {results.map((movie) => {
          return <MovieCard {...movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default categoryPage;

export async function getServerSideProps({ params: { cat } }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${cat}?api_key=04c35731a5ee918f014970082a0088b1&page=1`
  );
  const movies = await res.json();
  return {
    props: {...movies,cat}
  };
}
