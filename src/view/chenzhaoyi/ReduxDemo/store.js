import{createStore} from 'redux';
import reducer from './reducer';

const initStates=({
    'First':1,
    'Second':2,
    'Third':4,
})


const store = createStore(
    reducer,
    initStates,
    
);

export default store;