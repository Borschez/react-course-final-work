import { combineReducers } from 'redux';
import { issuesReducer } from './issues/reducer';
import { pagesReducer } from './pages/reducer';

export default combineReducers({
    pages: pagesReducer,
    issues: issuesReducer,
})