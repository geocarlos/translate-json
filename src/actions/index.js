const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;
const fs = window.require('fs');

export const ADD_LANGUAGE = 'ADD_LANGUAGE';

const addLanguage = language => {
    ipcRenderer.send('languages:add', language);
};

export const GET_LANGUAGES = 'GET_LANGUAGES';
const getLanguages = languages => ({ type: GET_LANGUAGES, languages });

const fetchLanguages = () => {
    ipcRenderer.send('languages:fetch');
};

export const ADD_ENTRY = 'ADD_ENTRY';
const addEntry = entry => {
    ipcRenderer.send('entries:add', entry);
};

export const GET_ENTRIES = 'GET_ENTRIES';
const getEntries = entries => ({ type: GET_ENTRIES, entries });

const fetchEntries = () => {
    ipcRenderer.send('entries:fetch');
};

export const ADD_TRANSLATION = 'ADD_TRANSLATION';
const addTranslation = translation => {
    ipcRenderer.send('translations:add', translation);
};

export const GET_TRANSLATIONS = 'GET_TRANSLATIONS';
const getTranslations = translations => ({ type: GET_TRANSLATIONS, translations });

const fetchTranslations = () => {
    ipcRenderer.send('translations:fetch');
};

const registerEventListeners = () => dispatch => {
    ipcRenderer.on('language:added', (event, result) => {
        dispatch({ type: ADD_LANGUAGE, language: result });
    });
    ipcRenderer.on('language:addFailed', (event, error) => {
        console.log(error);
    });
    ipcRenderer.on('languages:receive', (event, languages) => {
        dispatch(getLanguages(languages));
    });
    ipcRenderer.on('languages:fetchFailed', (event, error) => {
        console.log(error);
    });
    ipcRenderer.on('entry:added', (event, result) => {
        dispatch({ type: ADD_ENTRY, entry: result });
    });
    ipcRenderer.on('entry:addFailed', (event, error) => {
        console.log(error);
    });
    ipcRenderer.on('entries:receive', (event, entries) => {
        dispatch(getEntries(entries));
    });
    ipcRenderer.on('entries:fetchFailed', (event, error) => {
        console.log(error);
    });
    ipcRenderer.on('translation:added', (event, result) => {
        dispatch({ type: ADD_TRANSLATION, translation: result })
    });
    ipcRenderer.on('language:addFailed', (event, error) => {
        console.log(error);
    });
    ipcRenderer.on('translations:receive', (event, translations) => {
        console.log(translations);
        dispatch(getTranslations(translations));
    });
    ipcRenderer.on('translations:fetchFailed', (event, error) => {
        console.log(error);
    });
};

const addEntriesFromFile = entries => {
    ipcRenderer.send('entriesFromFile:add', entries);
}

const getExportedFile = async content => {
    try {
        const savePath = await dialog.showSaveDialog({});
        await fs.writeFileSync(savePath.filePath, content);
    } catch (error) {
        console.log(error);
    }
}

export const actions = {
    addEntry,
    addLanguage,
    addTranslation,
    fetchEntries,
    fetchLanguages,
    fetchTranslations,
    registerEventListeners,
    addEntriesFromFile,
    getExportedFile
};