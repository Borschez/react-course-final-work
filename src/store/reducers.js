import { combineReducers } from 'redux';
import { pagesReducer } from './pages/reducer';

export default combineReducers({
    pages: pagesReducer,
})