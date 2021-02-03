import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faStar, faFilm} from '@fortawesome/free-solid-svg-icons';
import styles from './filmCard.module.scss';

const FilmCard = (props) => {
  const {imdbID, Title, Runtime, Poster, Genre, imdbRating, Plot, TrailerUrl} = props.film;

  const changeTrailer = (TrailerUrl) => {
    props.setNewTrailer(TrailerUrl);
  };

  return (
    <Link to={`/movies/${imdbID}`} className={styles.topBox} onMouseOver={() => changeTrailer(TrailerUrl)}>
      <div className={styles.box} style={{backgroundImage: `url(${Poster})`}} role='image' alt={`${Title} film`}>
        <div className={styles.hoverBox}>
          <div className={styles.CardTitle}>{Title}</div>
          <div className={styles.description}>{Plot}</div>
        </div>
        <div className={styles.miniDetails}>
          <div className={styles.minDetailsBox}>
            <FontAwesomeIcon icon={faClock} color='gray' />
            <div>{Runtime === 'N/A' ? 'unknow' : Runtime}</div>
          </div>
          <div className={styles.minDetailsBox}>
            <FontAwesomeIcon icon={faStar} color='#FFD700' />
            <div>{imdbRating === 'N/A' ? 'unknow' : `${imdbRating}/10`}</div>
          </div>
          <div className={styles.minDetailsBox}>
            <FontAwesomeIcon icon={faFilm} color='#ff7517' />
            <div>{Genre}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FilmCard;
