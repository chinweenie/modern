import axios from 'axios';
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const RECEIVE_PROFILE_ERRORS = "RECEIVE_PROFILE_ERRORS";

export const receiveProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
});

export const receiveProfileErrors = errors => ({
    type: RECEIVE_PROFILE_ERRORS,
    errors
});

const getProfileRequest = username => (
    axios.get(`/@${username}`)   //$.ajax( url: '/files', data: {data})
);

export const getProfile = username => dispatch => {
    return getProfileRequest(username).then(response => {
        dispatch(receiveProfile(response.data))
    }, error => (
        dispatch(receiveProfileErrors(error.responseJSON))
    ));
};