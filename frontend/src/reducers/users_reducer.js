
import { RECEIVE_USERS, RECEIVE_USERS_ERRORS } from '../actions/users_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS:
            debugger;
            const newObject = {};
            action.users.forEach(user => {
                newObject[user._id] = user
            });
            return newObject;
        case RECEIVE_USERS_ERRORS:
            return action;
        default:
            return state;
    }
};

export default usersReducer;