import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './scenes/Home';
import { FilmDetailsContainer } from './scenes/FilmDetails';

const MovieRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/movies/:imdbID" component={FilmDetailsContainer} />
  </Switch>
);

export default MovieRouter;
