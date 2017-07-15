import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux'
import Demo from '../../modules/demo';
import configureStore from 'redux-mock-store'

test('Test rendering the demo component', () => {
    const reduxState = {};
    const store = configureStore()(reduxState);
    const component = renderer.create(
        <Provider store={store}>
            <Demo />
        </Provider>
    );

    expect(component).not.toBeNull();
});