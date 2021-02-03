import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch, faThumbsUp,faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './home.module.scss';
import { FilmCard } from '../../components/filmCard';
import films from '../../data.json';
import { YoutubePlayer } from '../../components/youtube';

const Home = () => {
  const [hoveredUrl, setHoveredUrl] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setSearching] = useState(false);
  const [avaiableFilms, setAvaiableFilms] = useState([]);
  const [comingSoonFilms, setComingSoonFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [likeCount,setLikeCount] = useState(0);
  const [averageRatings,setAverageRatings] = useState(0);

  useEffect(() => {
    if (!hoveredUrl && films) {
      setHoveredUrl(films[0].TrailerUrl);
    }

    if (avaiableFilms.length === 0 && comingSoonFilms.length === 0) {
      setAvaiableFilms(() => films.filter((film) => !film.ComingSoon));

      setComingSoonFilms(() => films.filter((film) => film.ComingSoon === true));
    }

    if (allFilms.length === 0 && !isSearching) {
      setAllFilms(films);
    }

    if(!likeCount) {
      calculateLikeCountAndAverage();
    }
  });

  const calculateLikeCountAndAverage = () => {
    let filmsName = films.map(film => {return film.Title});
    let counter = 0;
    let ratings = 0;
    let ratingsValue;

    filmsName.forEach(title => {
      ratingsValue = +localStorage.getItem(`${title}ratings`);
      if(ratingsValue){
        ratings += ratingsValue;
        counter++;
      }
    })

    setLikeCount(counter)
    ratings = ratings / counter;
    if(isNaN(ratings)) {
      ratings = 0;
    }
    setAverageRatings(ratings)

  }

  const setNewTrailer = (film) => {
    setHoveredUrl(film);
  };

  const resetAllFilm = () => {
    setAllFilms(films);
  };

  const searchFilm = (value) => {
    if (value.length < searchValue.length) {
      resetAllFilm();
    }
    setSearchValue(value);
    setTimeout(() => {
      setAllFilms((films) =>  [...films.filter((film) => { 
        return film.Title.toLowerCase().includes(value)
      })]);
    }, 50);

    if (value.length === 0) {
      resetAllFilm();
    }
  };

  const IsNotSearchingView = () => (
    <>
      { hoveredUrl
        ? <YoutubePlayer TrailerUrl={hoveredUrl} myClass={styles.youtube} />
        : <div className={styles.hoverdFilm} />}
      <div className={styles.subTitle}>Novita'</div>
      <div className={styles.movieList}>
        {avaiableFilms.map((film) => <FilmCard film={film} setNewTrailer={setNewTrailer} key={film.Title} />)}
      </div>
      <div className={styles.subTitle}>Presto in arrivo</div>
      <div className={styles.movieList}>
        {comingSoonFilms.map((film) => <FilmCard film={film} setNewTrailer={setNewTrailer} key={film.Title} />)}
      </div>
    </>
  );

  const IsSearchingView = () => (
    <>
      <h1 className={styles.title}>
        Searched for :
        <span>{searchValue}</span>
      </h1>
      <div className={styles.movieList}>
        {allFilms && allFilms.length > 0 ? allFilms.map((film) => <FilmCard film={film} setNewTrailer={setNewTrailer} key={film.Title} />) : <div className={styles.notFound}>Nessun film trovato...</div>}
      </div>
    </>
  );

  return (
    <div className={styles.box}>
      { isSearching ? <IsSearchingView /> : <IsNotSearchingView />}
      <div className={styles.searchFilmBox} onFocus={(e) => { setSearching(true)}}>
        <input className={styles.searchfilmInput} placeholder="Cerca film ..." onChange={(e) => searchFilm(e.currentTarget.value)} />
        <div className={styles.iconContainer}>
          {isSearching ? <FontAwesomeIcon color="white" icon={faTimesCircle} onClick={(e) => {setSearching(false); setSearchValue(''); e.currentTarget.parentNode.previousSibling.value = '';  } } /> : <FontAwesomeIcon color="white" icon={faSearch} />}
        </div>
      </div>
      <div className={styles.averageContainers}>
        <div className={styles.average}>
          <FontAwesomeIcon color={'#ff7517'} icon={faThumbsUp} className={styles.icon}/>
          <div>Totale recensioni: {likeCount}</div>
        </div>
        <div className={styles.average}>
          <FontAwesomeIcon color={'#ff7517'} icon={faStar} className={styles.icon}/>
          <div>Media recensioni: {averageRatings}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
