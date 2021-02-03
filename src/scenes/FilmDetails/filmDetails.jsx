import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import films from '../../data.json';
import styles from './filmDetails.module.scss';

const FilmDetails = (props) => {
  const {
    Title, Images, Genre, Runtime, Year, Director, Plot, Writer, Actors, Awards, Released,
  } = props.film;
  const [starRating, setStarRating] = useState([false, false, false, false, false]);
  const [firstEntry, setFirtsEntry] = useState(false);
  const [animationBack,setAnimationBack] = useState(false);

  const setRatings = (value) => {
    const newRatings = starRating;
    for (let i = 0; i < value; i++) {
      newRatings[i] = true;
    }
    newRatings.reverse();
    setStarRating((newRatings) => [...newRatings]);
  };

  const setVoteToFilm = (value) => {
    if (localStorage.getItem(`${Title}ratings`) === null) {
      setRatings(value);
      setFirtsEntry(true);
      localStorage.setItem(`${Title}ratings`, value);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(`${Title}ratings`) !== null && !firstEntry) {
      const rating = localStorage.getItem(`${Title}ratings`);
      setRatings(rating);
      setFirtsEntry(true);
    }

    if(!animationBack) {
      setTimeout(() => {
        setAnimationBack(true)
      },30)
    }
  }, [starRating]);

  const StarOfFilm = () => (
    <>
      {starRating.map((star, index) => (
        <FontAwesomeIcon icon={faStar} key={index} className={`${styles.star} ${star ? styles.starRated : ''}`} onClick={() => setVoteToFilm(starRating.length - index)} />
      ))}
    </>
  );

  return (
    <>
      <div className={`${styles.box} ${animationBack ? styles.boxZoom : ''}`} style={{ backgroundImage: `url(${Images[0]})`}} />
      <div className={styles.TitleBackground}>{Title.toUpperCase()}</div>
      <div className={styles.filmDetailsBox}>
        <div className={styles.filmInfo}>
          <div className={styles.basicInfo}>
            <div>
              {Runtime === 'N/A' ? (
                <>
                  <FontAwesomeIcon icon={faQuestionCircle} color="white" />
                  <span> min</span>
                </>
              ) : Runtime}
            </div>
            <div>{Genre}</div>
            <div>{Year}</div>
          </div>
          <h1 className={styles.title}>{Title}</h1>
          <div className={styles.titleUnderscore} />
          <div className={styles.directorScore}>
            <div className={styles.director}>{Director}</div>
            <div className={styles.scoreBox}>
              <StarOfFilm />
            </div>
          </div>
          <div className={styles.filmDescription}>
            {Plot}
          </div>
          <div className={styles.writerBox}>
            <b>WRITER:</b>
            {Writer}
          </div>
          <div className={styles.writerBox}>
            <b>ACTORS:</b>
            {Actors}
          </div>
          <div className={styles.writerBox}>
            <b>AWARDS:</b>
            {Awards}
          </div>
          <div className={styles.writerBox}>
            <b>RELEASED:</b>
            {Released}
          </div>
          <div className={styles.cardImage}>
            {Images && Images.length > 0
              ? Images.map((image, index) => <div key={index} className={styles.card} style={{ backgroundImage: `url(${image})` }} />) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const FilmDetailsContainer = () => {
  const { imdbID } = useParams();
  const film = films.filter((film) => film.imdbID === imdbID)[0];

  const RenderFilm = () => (
    <>
      {film ? <FilmDetails film={film} /> : <Redirect path="/" />}
    </>
  );

  return <RenderFilm />;
};

export default FilmDetailsContainer;

/*
   {
      "Title": "I Am Legend", OK
      "Year": "2007", OK
      "Rated": "PG-13",
      "Released": "14 Dec 2007",
      "Runtime": "101 min", OK
      "Genre": "Drama, Horror, Sci-Fi", OK
      "Director": "Francis Lawrence", OK
      "Writer": "Mark Protosevich (screenplay), Akiva Goldsman (screenplay), Richard Matheson (novel), John William Corrington, Joyce Hooper Corrington",
      "Actors": "Will Smith, Alice Braga, Charlie Tahan, Salli Richardson-Whitfield",
      "Plot": "Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.",
      "Language": "English",
      "Country": "USA",
      "Awards": "9 wins & 21 nominations.",
      "Poster": "https://ia.media-imdb.com/images/M/MV5BMTU4NzMyNDk1OV5BMl5BanBnXkFtZTcwOTEwMzU1MQ@@._V1_SX2500.jpg",
      "Metascore": "65",
      "imdbRating": "7.2",
      "imdbVotes": "533,874",
      "imdbID": "tt0480249",
      "Type": "movie",
      "Response": "True",
      "Images": [
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI0NTI4NjE3NV5BMl5BanBnXkFtZTYwMDA0Nzc4._V1_.jpg",
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTIwMDg2MDU4M15BMl5BanBnXkFtZTYwMTA0Nzc4._V1_.jpg",
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc5MDM1OTU5OV5BMl5BanBnXkFtZTYwMjA0Nzc4._V1_.jpg",
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0MTI2NjMzMzFeQTJeQWpwZ15BbWU2MDMwNDc3OA@@._V1_.jpg"
      ],
      "TrailerUrl": "ec3rmiTnm44"
    },

*/
