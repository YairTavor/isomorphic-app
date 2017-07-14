import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = Store.get(false, JSON.parse(window.serverState));

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App store={store} />
        </Provider>
    </BrowserRouter>
);
ReactDOM.render(app, document.querySelector('#root'));