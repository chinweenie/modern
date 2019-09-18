import { RECEIVE_FILE } from '../actions/upload_actions';


const uploadReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FILE:
            return { fileURL: action.file.fileURL };
        default:
            return state;
    }
};

export default uploadReducer;