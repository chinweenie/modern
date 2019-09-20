import { RECEIVE_PROFILE, RECEIVE_PROFILE_ERRORS } from '../actions/profile_actions';

// TODO: handle the response properly
const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_PROFILE:
            return action.profile ;
        case RECEIVE_PROFILE_ERRORS:
            return action;
        default:
            return state;
    }
};

export default profileReducer;