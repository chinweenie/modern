import { combineReducers } from 'redux';
import uiReducer from './ui_reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';

const rootReducer = combineReducers({
    // entites: entitesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    UI: uiReducer
});

export default rootReducer;