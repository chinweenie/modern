import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const _nullUser = Object.freeze({
    currentUser: null
});

const sessionReducer = (state = _nullUser, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { currentUser: action.currentUser};
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                currentUser: undefined
            };
        default:
            return state;
    }
};

export default sessionReducer;