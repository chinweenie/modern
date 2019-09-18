import { RECEIVE_FILE, RECEIVE_FILES  } from '../actions/file_actions';

const filesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FILE:
            console.log(action);
            debugger;
            return Object.assign({}, state, {
                [action.file.id]: action.file
            })
        case RECEIVE_FILES:
            debugger
            const filesArray = action.files.files;
            const newObject = {};
            filesArray.forEach(file => {
                newObject[file.email] = file
            });
            // { deposit: Object.values(action.deposits).map(info => info.amount) });
            return Object.assign({}, newObject);
        default:
            return state;
    }
};

export default filesReducer;


// { fileURL: action.file.fileURL };