import {types} from './actions';

export default store => next => action => {
    if(action.type === types.DEMO_GET_DATA){
        // must return promise form action for the router to work properly on the server
        return new Promise(resolve => {
            setTimeout(() => {
                action.payload = { data: 'some data' };
                next(action);
                // this resolve is for the server, we must wrap the payload with the store section just like the reducer.
                resolve({ demo: action.payload });
            }, 1000);
        });
    }
    next(action);
}