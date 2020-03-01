import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../actions';
import { makeStyles, Button, Tooltip, IconButton } from '@material-ui/core';
import { PostAdd, Add } from '@material-ui/icons';
import Entries from './Entries';

const useStyles = makeStyles({
    root: {
        margin: 0,
        '& ul': {
            listStyle: 'none'
        }
    },
    form: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
        maxWidth: '90%',
        gridGap: '1em'
    }
});

const Translation = ({ translation }) => {
    const entries = useSelector(state => state.entries);
    const languages = {};
    useSelector(state => state.languages.forEach(language => {
        if (language.code === translation.source || language.code === translation.target) {
            languages[language.code] = language.name;
        }
    }))
    const dispatch = useDispatch();
    const [sourceEntries, setSourceEntries] = React.useState([]);
    const [targetEntries, setTargetEntries] = React.useState([]);
    const [key, setKey] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [source, setSource] = React.useState('');
    const [target, setTarget] = React.useState('');
    const [editing, setEditing] = React.useState(false);
    const ENTRIES_PER_PAGE = 5;
    const [entryPages, setEntryPages] = React.useState([0, ENTRIES_PER_PAGE - 1]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const classes = useStyles();

    React.useEffect(() => {
        actions.fetchEntries();
    }, [dispatch])

    React.useEffect(() => {
        setSourceEntries(entries.filter(entry => entry.language === translation.source));
        setTargetEntries(entries.filter(entry => entry.language === translation.target));
    }, [entries]);

    const clearForm = () => {
        setKey('');
        setSource('');
        setTarget('');
        setDescription('');
    }

    const handleSubmit = event => {
        event.preventDefault();
        const sourceEntry = {
            key,
            language: translation.source,
            content: source,
            description
        }
        const targetEntry = {
            ...sourceEntry,
            language: translation.target,
            content: target
        }
        actions.addEntry(sourceEntry);
        actions.addEntry(targetEntry);
        clearForm();
    }

    const prepareTranslationSet = () => {
        const sourceLanguage = {};
        const targetLanguage = {};

        sourceEntries.forEach(entry => {
            sourceLanguage[entry.key] = entry;
        });

        targetEntries.forEach(entry => {
            targetLanguage[entry.key] = entry;
        });

        for (const key in sourceLanguage) {
            if (!targetLanguage[key]) {
                targetLanguage[key] = sourceLanguage[key];
            }
            sourceLanguage[key].translation = targetLanguage[key].content;
            sourceLanguage.sourceHeader = languages[translation.source];
            sourceLanguage.targetHeader = languages[translation.target];
        }

        return sourceLanguage;
    }

    const editEntry = entry => {
        setKey(entry.key);
        setSource(entry.source);
        setTarget(entry.target);
        setDescription(entry.description);
        setEditing(true);
    }

    const handleDismiss = event => {
        event.preventDefault();
        clearForm();
        setEditing(false);
    }

    const handleNavigate = direction => {
        const previous = entryPages[0] + direction;
        const next = entryPages[1] + direction;

        if(previous < 0 || next > sourceEntries.length) return;

        setEntryPages([previous, next]);
        setCurrentPage(currentPage + Math.abs(direction) / direction);
    };

    return (
        <div>
            <h1>Translation Editor</h1>
            <label>Add source language from file </label>
            <Tooltip title="Add source from file">
                <IconButton onClick={() => console.log('add from docuemnt')}><PostAdd /></IconButton>
            </Tooltip>
            <label>| Add new entry </label>
            <Tooltip title="Add source from file">
                <IconButton onClick={() => setEditing(true)}><Add/></IconButton>
            </Tooltip>
            <Button onClick={() => handleNavigate(-ENTRIES_PER_PAGE)}>Previous</Button>
            <Button onClick={() => handleNavigate(ENTRIES_PER_PAGE)}>Next</Button>
            <label>Page {currentPage} of {Math.ceil(sourceEntries.length / ENTRIES_PER_PAGE)}</label>
            {(editing || !entries.length) && <form onSubmit={handleSubmit} className={classes.form}>
                <label>Key: </label>
                <input type="text" value={key} onChange={e => setKey(e.target.value)} />
                <label style={{ gridColumn: '1/2' }}>{languages[translation.source]} (source): </label>
                <input type="text" value={source} onChange={e => setSource(e.target.value)} />
                <label>{languages[translation.target]} (target): </label>
                <input type="text" value={target} onChange={e => setTarget(e.target.value)} />
                <label>Description: </label>
                <input style={{ gridColumn: '2/5' }} type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <Button disabled={!(key && source && target)} style={{ gridColumn: '1/2' }} variant="contained" size="small" color="primary" type="submit">Add</Button>
                <Button variant="outlined" color="secondary" onClick={handleDismiss}>Dismiss</Button>
            </form>}
            <div className={classes.entries}>
                <Entries languagePair={prepareTranslationSet()} editEntry={editEntry} entryPages={entryPages} />
            </div>
        </div>
    );
}

export default Translation;