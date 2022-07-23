// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_DOCUMENTARIES, REMOVE_FAVORITE, ADD_FAVORITE, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function documentaries(state = [], action) {
    switch (action.type) {
        case SET_DOCUMENTARIES:
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.value || localStorage.getItem('user');
        case ADD_FAVORITE:
            return action.value;
        case REMOVE_FAVORITE:
            return action.value;
        default:
            return state;
    }
}

const DocumentariesApp = combineReducers({
    visibilityFilter,
    documentaries,
    user
});


export default DocumentariesApp;