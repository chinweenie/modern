import { UPLOAD_IMAGE } from '../actions/upload_actions';


const uploadReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case UPLOAD_IMAGE:
            debugger;
            return { files: action.files };
        default:
            return state;
    }
};

export default uploadReducer;