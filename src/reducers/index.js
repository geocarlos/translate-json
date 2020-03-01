import {ADD_ENTRY, ADD_LANGUAGE, GET_ENTRIES, GET_LANGUAGES} from '../actions';
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

export default combineReducers({
    languages, entries
});
