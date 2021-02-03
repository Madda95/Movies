import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import MovieRouter from './router';

const App = () => (
  <Router>
    <MovieRouter />
  </Router>
);

export default App;
