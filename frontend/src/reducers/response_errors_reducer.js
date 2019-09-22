import {
    RECEIVE_RESPONSES,
    RECEIVE_RESPONSE_ERRORS,
} from "../actions/stories_actions";


const responseErrorsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_RESPONSE_ERRORS:
            return action.errors;

        case RECEIVE_RESPONSES:
            return [];

        default:
            return [];
    }
}

export default responseErrorsReducer;