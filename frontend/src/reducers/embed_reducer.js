import { RECEIVE_EMBED, RECEIVE_EMBED_ERRORS } from '../actions/embed_actions';

const embedReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_EMBED:
            return action.embed;
        case RECEIVE_EMBED_ERRORS:
            return action;
        default:
            return state;
    }
};

export default embedReducer;