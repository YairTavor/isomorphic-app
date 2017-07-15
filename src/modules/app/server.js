/*eslint-disable no-console*/

import path from 'path';
import fs from 'fs';
import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {matchPath} from 'react-router-dom'
import {StaticRouter} from 'react-router'
import {Provider} from 'react-redux';
import Store from './store';
import App from './App';
import routes from './routes';

let indexHtml = fs.readFileSync(path.resolve(__dirname, 'client/index.html'), 'utf8');
const app = Express();
const port = 8080;

const prefetchData = (req) => {
    const promises = [];
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    routes.get(Store.get(true)).some(route => {
        // use `matchPath` here
        const match = matchPath(req.url, route);
        if (match) {
            promises.push(route.loadData(match));
        }
        return match
    });

    return Promise.all(promises);
};

const renderFullPage = (html, preloadedState) => {
    const state = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
    const result = indexHtml.replace('@@server-state@@', state).replace('<!--server-content-->', html);
    return result;
};

function handleRender(req, res) {
    prefetchData(req)
        .then(data => {
            const store = Store.get(true, Object.assign(...data));
            const context = {};

            // Render the component to a string
            let html = renderToString(
                <StaticRouter
                    location={req.url}
                    context={context}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StaticRouter>
            );

            if (context.url) {
                res.writeHead(301, {
                    Location: context.url
                });
                res.end();
            }
            else {
                // Grab the initial state from our Redux store
                const preloadedState = store.getState();

                // Send the rendered page back to the client
                res.send(renderFullPage(html, preloadedState));
            }
        })
        .catch( () => {
            res.end(500);
        });
}

//Serve static files
app.use('/public', Express.static(path.join(__dirname, 'client/public')));

// This is fired every time the server side receives a request
app.use(handleRender);
app.listen(port);
console.log(`Server started, listening on http://localhost:${port}`);
