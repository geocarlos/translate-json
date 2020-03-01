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
        gridTemplateColumns: 'repeat(4, 1fr)',
        maxWidth: '70%',
        gridGap: '1em',
        '& input[type="text"]': {
            textAlign: 'center'
        }
    }
}));

const Languages = () => {
    const dispatch = useDispatch();
    const languages = useSelector(state => state.languages);
    const classes = useStyles();
    const [showForm, setShowForm] = React.useState(false);
    const codeRef = React.useRef();
    const nameRef = React.useRef();

    const handleSubmit = event => {
        event.preventDefault();
        actions.addLanguage({
            code: codeRef.current.value,
            name: nameRef.current.value
        })(dispatch);
        codeRef.current.value = '';
        nameRef.current.value = '';
    }

    return (
        <div className={classes.root}>
            <h2>Languages
                {!showForm && <Tooltip title="Add language"><IconButton style={{padding: 0}} variant="outlined" color="primary" onClick={() => setShowForm(true)}><AddCircle /></IconButton></Tooltip>}
            </h2>
            {showForm && <form onSubmit={handleSubmit} className={classes.form}>
                <label>Language code: </label>
                <input type="text" ref={codeRef} />
                <label>Language name: </label>
                <input type="text" ref={nameRef} />
                <Button variant="contained" size="small" color="primary" type="submit">Add</Button>
                <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>Dismiss</Button>
            </form>}
            <ul>
                {languages.length ? languages.map((language, index) => (
                    <li key={index}>
                        <div>{language.name}<Tooltip title="Edit language"><IconButton><Edit/></IconButton></Tooltip></div>
                    </li>
                )) :
                    <p>No languages</p>
                }
            </ul>
        </div>
    )
}

export default Languages;