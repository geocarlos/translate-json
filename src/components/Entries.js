import React from 'react';
import { makeStyles, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        overflow: 'auto',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 50px',
        gridTemplateRows: 'auto',
        '& div': {
            borderBottom: 'solid thin',
            borderRight: 'solid thin',
            padding: '.5em'
        }
    }
})

const Entries = ({ languagePair, editEntry, entryPages }) => {
    const classes = useStyles();

    const handleEntry = key => {
        editEntry({
            id: languagePair[key].id,
            key: languagePair[key].key,
            source: languagePair[key].content,
            target: languagePair[key].translation,
            description: languagePair[key].description,
            targetId: languagePair[key].targetId
        })
    }
    return (
        <div>
            <div className={classes.root}>
                <h3>Key</h3>
                <h3>{languagePair.sourceHeader}</h3>
                <h3>{languagePair.targetHeader}</h3>
                <h3>Description</h3>
            </div>
            {Object.keys(languagePair).map((key, i) => {
                return key !== 'sourceHeader' && key !== 'targetHeader' && i >= entryPages[0] && i <= entryPages[1] ? (
                    <div key={key} className={classes.root}>
                        <div>{languagePair[key].key}</div>
                        <div>{languagePair[key].content}</div>
                        <div>{languagePair[key].translation}</div>
                        <div>{languagePair[key].description}</div>
                        <div>
                            <IconButton style={{ padding: 0 }} onClick={() => handleEntry(key)}><Edit /></IconButton>
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    )
}

export default Entries;