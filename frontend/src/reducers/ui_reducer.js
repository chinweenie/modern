import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import uploadReducer from './uploads_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    files: uploadReducer
})

export default uiReducer;

