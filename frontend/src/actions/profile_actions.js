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