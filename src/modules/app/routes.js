import Demo from '../demo';
import {actions as demoActions} from '../demo/actions';

export default {
    get: store => [
        {
            path: '/',
            component: Demo,
            loadData: () => store.dispatch(demoActions.demoGetData())
        }
    ]
}