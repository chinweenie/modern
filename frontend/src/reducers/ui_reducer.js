import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import filesReducer from './files_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    files: filesReducer
});

export default uiReducer;

