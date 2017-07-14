import React from 'react';
import {Switch, Route} from 'react-router-dom';
import routes from './routes';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.routes = routes.get(props.store);
    }

    render() {
        return (
            <Switch>
                {this.routes.map(route => (
                    <Route key={route.path} {...route}/>
                ))}
            </Switch>
        )
    }
}