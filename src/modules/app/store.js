import { createStore, applyMiddleware, combineReducers } from 'redux';

// Import reducers
import demoReducer from '../demo/reducer';

// Import middleware
import demoMiddleware from '../demo/middleware';

let store;

const reducers = combineReducers({
    demo: demoReducer
});

const middleware = [
    demoMiddleware
];

const createNewStore = (defaultState) => {
    return createStore(
        reducers,
        defaultState,
        applyMiddleware(...middleware)
    );
};

export default {
    get: (alwaysNew = false, preloadedState = {}) => {
        let result;
        if(alwaysNew){
            result = createNewStore(preloadedState);
        }
        else {
            result = store || createNewStore(preloadedState);
        }
        return result;
    }
}