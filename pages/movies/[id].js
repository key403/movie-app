import React, { useState } from 'react'
import styles from "../../styles/MovieDetails.module.scss"
import {AiFillStar} from "react-icons/ai"

const InfoPage = (data) => {

  return (
    <div className='container'>
      {/* movie preview start*/}
      <div className={styles.coverContainer}>
        {/* movie backdrop */}
        <div>
          <img className='w-100' src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`} alt="" />
        </div>

        {/* content */}
        <div className={styles.movieDetails}>
          {/* movie cover start*/}
          <div className="w-30" data-aos="fade-up" data-aos-duration={1000}>
            <img className={`w-100`} src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt="" />
          </div>
          {/* movie cover end */}

          {/* text side start*/}
          <div className={`w-70 ${styles.movieDetailsBG}`} data-aos="fade-up" data-aos-duration={1000}>
            <h3 className={styles.movieTitle} data-aos="fade-left" data-aos-duration={1000} data-aos-delay={100} >{data.title}</h3>
            {data.tagline && (
              <div data-aos="fade-left" data-aos-duration={1000} data-aos-delay={100}>{data.tagline}</div>
            )}
            <div className='mt-1' data-aos="fade-left" data-aos-duration={1000} data-aos-delay={100}>
              {Math.round((data.vote_average*10)) /10}<AiFillStar className='a' /> 
              <span className={styles.movieRating}>({data.vote_count})votes</span>
            </div>
            <div className='mt-1' data-aos="fade-left" data-aos-duration={1000} data-aos-delay={100}>
              {data.runtime} mins
            </div>
            <div className='mt-1' data-aos="fade-left" data-aos-duration={1000} data-aos-delay={100}>
              Release date: {data.release_date}
            </div>
            <div className='d-flex wrap gap-1 mt-2'>
              {data.genres.map((item,i) => (
                <button className='btn relative font-s' key={item.id} data-aos="zoom-in-up" data-aos-duration={1000} data-aos-delay={200 +(550*i)}>
                  <div className='btn-animation'></div>
                  {item.name}
                </button>
              ))}
            </div>

            <div className='mt-5'>
              <h2 className={styles.movieSinopsisTitle}>Sinopsis</h2>
              <p>{data.overview}</p>
            </div>
          </div>
          {/* text side end */}
        </div>
      </div>
      {/* image preview end */}



    </div>
  )
}

export default InfoPage

export async function getServerSideProps({params: {id}}) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=04c35731a5ee918f014970082a0088b1`)
  const data = await res.json()
  return {
    props: data
  }
}