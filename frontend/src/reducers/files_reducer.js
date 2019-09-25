import { RECEIVE_FILE, RECEIVE_FILES, DELETE_FILE } from '../actions/file_actions';

const filesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FILE:
            return Object.assign({}, state, { [action.file.user_id]: action.file.fileURL})
        case RECEIVE_FILES:
            return Object.assign({}, action.files.map(o => { return { URL: o.URL, filename: o.name }}));
        case DELETE_FILE:
            return Object.assign({}, { deletedFile: action.data.filename});
        default:
            return state;
    }
};

export default filesReducer;