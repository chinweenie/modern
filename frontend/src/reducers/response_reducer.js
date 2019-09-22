import { RECEIVE_RESPONSES } from "../actions/stories_actions";

const responseReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_RESPONSES:
            return action.responses.responses || state;
        default:
            return state;
    }
};

export default responseReducer;