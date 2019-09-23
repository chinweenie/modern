
import { RECEIVE_USERS, RECEIVE_USERS_ERRORS } from '../actions/users_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USERS:
            const newArr = [];
            action.users.forEach(user => newArr.push({ [user._id]: user }));
            return newArr;
        case RECEIVE_USERS_ERRORS:
            return action;
        default:
            return state;
    }
};

export default usersReducer;