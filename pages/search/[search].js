import React from "react";
import MovieCard from "../../components/MovieCard";

const SearchResults = ({ results }) => {
  return (
    <div>
      {!results.length ? (
        <div>there is results</div>
      ) : (
        <div className="movie-container">
          {results.map((movie, i) => {
            console.log(i * 20);
            return <MovieCard {...movie} key={movie.id} time={i} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

export async function getServerSideProps({ params: { search } }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&query=${search}`
  );
  const movies = await res.json();
  return {
    props: movies,
  };
}
