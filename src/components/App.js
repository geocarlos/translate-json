import React from 'react';
import { makeStyles } from '@material-ui/core';
import Languages from './Languages';
import * as actions from '../actions';

const useStyles = makeStyles({
  root: {
    margin: 0
  }
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>TranslateJSON</h1>
      <Languages/>
    </div>
  );
}

export default App;
