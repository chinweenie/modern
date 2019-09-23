import { RECEIVE_CLAPS } from "../actions/stories_actions";

const clapsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CLAPS:
            return Object.keys(action.claps) || state;
        default:
            return state;
    }
}

export default clapsReducer;







