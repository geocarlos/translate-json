import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import Languages from './Languages';
import Translations from './Translations';
import Translation from './Translation';

const useStyles = makeStyles({
  root: {
    margin: '30px',
    maxHeight: '100vh',
    overflowY: 'hidden'
  },
  pageButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '10px'
  }
});

const App = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState('translations');
  const [currentTranslation, setCurrentTranslation] = React.useState(null);

  const pages = {
    languages: <Languages/>,
    translations: <Translations setPage={setPage} setTranslation={setCurrentTranslation}/>,
    translation: <Translation translation={currentTranslation}/>
  }

  return (
    <div className={classes.root}>
      <h1>TranslateJSON</h1>
      <div className={classes.pageButtons}>
        <Button onClick={() => setPage('translations')} variant="outlined" color="primary">Translations</Button>
        <Button onClick={() => setPage('languages')} variant="outlined" color="primary">Languages</Button>
      </div>
      {pages[page] && pages[page]}
    </div>
  );
}

export default App;
