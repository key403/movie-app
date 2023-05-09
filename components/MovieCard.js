import React from "react";
import styles from "../styles/Movies.module.scss";
import Link from "next/link";

const img_api = "https://image.tmdb.org/t/p/w1280";

const MovieCard = ({
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  id,
}) => {
  
  return (
    <div className={`${styles.movie} hidden`} data-aos="fade-up" data-aos-duration={1800} data-aos-offset="80" data-aos-once={false}>
      <Link href={`/movies/${id}`}>
        <img src={img_api + poster_path} alt={title} />

        <div className={styles.movie__info}>
          <p className={styles.movie__title}>{title}</p>

          <div>
            <div className={styles.movie__rating}>
              <p>{release_date}</p>
              <p>{vote_average}</p>
            </div>
            <p className={styles.movie__desc}>
              {overview.slice(0, 120) + "..."}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
