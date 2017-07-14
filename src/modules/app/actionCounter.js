const middleware = store => next => action => {

    next(action);
}
