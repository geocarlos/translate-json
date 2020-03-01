import {ADD_ENTRY, ADD_LANGUAGE, GET_ENTRIES, GET_LANGUAGES, ADD_TRANSLATION, GET_TRANSLATIONS} from '../actions';
import { combineReducers } from 'redux';

const languages = (state = [], action) => {
    switch(action.type) {
        case ADD_LANGUAGE:
            return state.concat(action.language)
        case GET_LANGUAGES:
            return action.languages;
        default:
            return state;
    }
}

const entries = (state = [], action) => {
    switch(action.type) {
        case ADD_ENTRY:
            return state.concat(action.entry);
        case GET_ENTRIES:
            return action.entries;
        default:
            return state;
        
    }
}

const translations = (state = [], action) => {
    switch(action.type) {
        case ADD_TRANSLATION:
            return state.concat(action.translation);
        case GET_TRANSLATIONS:
            return action.translations;
        default:
            return state;
        
    }
}

const showRegisterEvents = (state = true, action) => {
    switch(action.type) {
        case 'REGISTER_EVENTS':
            return !state;
        default:
            return state;
        
    }
}

export default combineReducers({
    languages, entries, translations, showRegisterEvents
});
