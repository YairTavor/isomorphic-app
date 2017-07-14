import {types} from './actions';

const defaultState = {
    data: 'none'
};

export default (state = defaultState, action) => {
    if(Object.keys(types).includes(action.type)){
        return {...state, ...action.payload};
    }
    else {
        return state;
    }
};
