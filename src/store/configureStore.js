import { createStore } from 'redux';
import reducer from '../reducers/calendar'

export default () => {
    return createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
} 


