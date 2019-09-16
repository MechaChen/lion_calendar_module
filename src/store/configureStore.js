import { createStore } from 'redux';
import reducer from '../reducers/calendar'

export default () => {
    return createStore(reducer);
} 


