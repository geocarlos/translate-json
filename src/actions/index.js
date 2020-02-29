import { ipcRenderer } from 'electron';

export const ADD_LANGUAGE = 'ADD_LANGUAGE';

const addLanguage = language => dispatch => {
    ipcRenderer.send('languages:add');
    dispatch({type: ADD_LANGUAGE, language})
};

export const GET_LANGUAGES = 'GET_LANGUAGES';
const getLanguages = languages => ({type: GET_LANGUAGES, languages});

const fetchLanguages = () => dispatch => {
    ipcRenderer.send('languages:fetch');
    // const entries = require('../mocks/entries');
    // dispatch(getLanguages(languages));
};

export const ADD_ENTRY = 'ADD_ENTRY';

const addEntry = entry => dispatch => {
    ipcRenderer.send('entries:add');
    // dispatch({type: ADD_ENTRY, entry})
};


export const GET_ENTRIES = 'GET_ENTRIES';
const getEntries = entries => ({type: GET_ENTRIES, entries});

const fetchEntries = () => dispatch => {
    ipcRenderer.send('entries:fetch');
    // const entries = require('../mocks/entries');
    // dispatch(getEntries(entries));
};

export const actions = {
    addEntry,
    fetchEntries
};