import * as UsersApiUtil from '../util/users_util';

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USERS_ERRORS = "RECEIVE_USERS_ERRORS";

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const receiveUsersErrors = errors => ({
    type: RECEIVE_USERS_ERRORS,
    errors
});

export const fetchAllUsers = () => dispatch => {
    return UsersApiUtil.getAllUsersRequest().then(response => (
        dispatch(receiveUsers(response.data))
    ), error => (
        dispatch(receiveUsersErrors(error.response.data))
    ));
};