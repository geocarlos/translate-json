import React from 'react';
import { makeStyles } from '@material-ui/core';
import Languages from './Languages';
import { actions } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    margin: 0
  }
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  return (
    <div className={classes.root}>
      <h1>TranslateJSON</h1>
      <Languages />
    </div>
  );
}

export default App;
