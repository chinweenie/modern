import { getProfileRequest, fetchStoriesOfOneUser } from '../util/profile_util';

export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const RECEIVE_PROFILE_ERRORS = "RECEIVE_PROFILE_ERRORS";
export const RECEIVE_STORIES = "RECEIVE_STORIES";

export const receiveProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
});
export const receiveStories = stories => ({
    type: RECEIVE_STORIES,
    stories
});

export const receiveProfileErrors = errors => ({
    type: RECEIVE_PROFILE_ERRORS,
    errors
});

export const getStories = user => dispatch => {
    fetchStoriesOfOneUser(user).then(response => {
        dispatch(receiveStories(response.data))
    }, error => (
        dispatch(receiveProfileErrors(error.response.data))
    ));
};

export const getProfile = username => dispatch => {
    return getProfileRequest(username).then(response => {
        dispatch(receiveProfile(response.data))
    }, error => (
        dispatch(receiveProfileErrors(error.response.data))
    ));
};