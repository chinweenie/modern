import { RECEIVE_EMBED, RECEIVE_EMBED_ERRORS } from '../actions/embed_actions';

const embedReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_EMBED:
            const description = action.embed.description || "";
            return Object.assign({}, { description: description });
        case RECEIVE_EMBED_ERRORS:
            return action;
        default:
            return state;
    }
};

export default embedReducer;