import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Languages from './Languages';
import Translations from './Translations';

const useStyles = makeStyles({
  root: {
    margin: '30px'
  }
});

const App = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(null);

  const pages = {
    languages: <Languages/>,
    translations: <Translations setPage={setPage}/>
  }

  return (
    <div className={classes.root}>
      <h1>TranslateJSON</h1>
      <Button onClick={() => setPage('translations')} variant="outlined" color="primary">View Translations</Button>
      <Button variant="outlined" color="primary">Add Translations</Button>
      <Button onClick={() => setPage('languages')} variant="outlined" color="primary">View Languages</Button>
      {pages[page] && pages[page]}
    </div>
  );
}

export default App;
