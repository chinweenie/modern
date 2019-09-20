import * as SessionApiUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

export const recieveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signup = (user) => dispatch => {
  return SessionApiUtil.signup(user).then(response => {
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    SessionApiUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded));
  }, error => (
    dispatch(recieveSessionErrors(error.response.data))
  ))
};

export const login = (user) => dispatch => (
  SessionApiUtil.login(user).then(response => {
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    SessionApiUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded));
  }, error => {
     return dispatch(recieveSessionErrors(error.response.data))
  })
);
export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken');
  // Remove the token from the common axios header
  SessionApiUtil.setAuthToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};