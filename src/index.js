import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const uppyReducer = (state = [], action) => {
    console.log('inside uppy reducer', action);
    if (action.type === 'SET_USER_AVATAR_URL') {
        // add this string to our array
        return [...state, action.payload]
    }
    return state;
}

const storeInstance = createStore(
    combineReducers({
        uppyReducer,
    }),
);

ReactDOM.render(
    <Provider store={storeInstance}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
