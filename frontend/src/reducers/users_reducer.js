
import { RECEIVE_USERS, RECEIVE_USERS_ERRORS } from '../actions/users_actions';

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users.map(o => { return { id: o._id, email: o.email, username: o.email.split("@")[0] } });
        case RECEIVE_USERS_ERRORS:
            return action;
        default:
            return state;
    }
};

export default profileReducer;