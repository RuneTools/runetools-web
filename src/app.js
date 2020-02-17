import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { initialSettingsContext } from './hooks/settings.js';
import { GlobalProvider } from './providers/globalProvider.js';
import { globalStateReducer } from './reducers/globalStateReducer.js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('worker.bundle.js')
            .then(registration => {
                console.log('Service worker registered with scope: ', registration.scope);
            })
            .catch(err => {
                console.error('Failed to register service worker', err);
            });
    });
}

function Wrapper() {
    const globalState = useReducer(globalStateReducer, {
        nemiForest: {},
        settings: initialSettingsContext,
        vos: {
            clans: []
        }
    });

    return (
        <GlobalProvider value={globalState}>
            <App />
        </GlobalProvider>
    )
}

ReactDOM.render(<Wrapper />, document.getElementById('container'));
