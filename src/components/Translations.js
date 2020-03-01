import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Button, IconButton, Tooltip } from '@material-ui/core';
import { AddCircle, Edit } from '@material-ui/icons';
import { actions } from '../actions';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        '& ul': {
            listStyle: 'none'
        }
    },
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        maxWidth: '85%',
        gridGap: '1em'
    }
}));

const Translations = ({setPage}) => {
    const dispatch = useDispatch();
    const translations = useSelector(state => state.translations);
    const languages = useSelector(state => state.languages);
    const classes = useStyles();
    const [showForm, setShowForm] = React.useState(false);
    const sourceRef = React.useRef();
    const targetRef = React.useRef();

    const handleSubmit = event => {
        event.preventDefault();
        actions.addTranslation({
            source: sourceRef.current.value,
            target: targetRef.current.value
        })(dispatch);
        sourceRef.current.value = '';
        targetRef.current.value = '';
    }

    return (
        <div className={classes.root}>
            <h2>Translations
                {!showForm && <Tooltip title="Add translation"><IconButton style={{padding: 0}} variant="outlined" color="primary" onClick={() => setShowForm(true)}><AddCircle /></IconButton></Tooltip>}
            </h2>
            {showForm && <form onSubmit={handleSubmit} className={classes.form}>
                <label>Source language: </label>
                <select ref={sourceRef}>
                    {languages.map((language, index) => (
                        <option value={language.code}>{language.name}</option>
                    ))}
                </select>
                <label>Target language: </label>
                <select ref={targetRef}>
                    {languages.map((language, index) => (
                        <option value={language.code}>{language.name}</option>
                    ))}
                </select>
                <Tooltip title="Add language"><IconButton onClick={() => {console.log(setPage);setPage('languages')}} style={{padding: 0}} variant="outlined" color="primary"><AddCircle /></IconButton></Tooltip>
                <Button variant="contained" size="small" color="primary" type="submit">Add</Button>
                <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>Dismiss</Button>
            </form>}
            <ul>
                {translations.length ? translations.map((translation, index) => (
                    <li key={index}>
                        <div>Source: {translation.source}, Target: {translation.target}<Tooltip title="Edit translation"><IconButton><Edit/></IconButton></Tooltip></div>
                    </li>
                )) :
                    <p>No translations</p>
                }
            </ul>
        </div>
    )
}

export default Translations;