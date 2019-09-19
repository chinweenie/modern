import { RECEIVE_FILE, RECEIVE_FILES  } from '../actions/file_actions';

const filesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FILE:
            return Object.assign({}, state, {[action.file.email]: action.file.fileURL})
        case RECEIVE_FILES:
            return Object.assign({}, action.files.map(o => { return { URL: o.URL, name: o.name }}));
        default:
            return state;
    }
};

export default filesReducer;


// { fileURL: action.file.fileURL };