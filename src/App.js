import React from 'react';
import { makeStyles } from '@material-ui/core';

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
    </div>
  );
}

export default App;
