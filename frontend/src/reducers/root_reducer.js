import { combineReducers } from 'redux';
import uiReducer from './ui_reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import entitiesReducer from './entities_reducer';

const rootReducer = combineReducers({
    entites: entitiesReducer,
    session: sessionReducer,
    errors: errorsReducer,
    UI: uiReducer
});

export default rootReducer;