import axios from 'axios';

export const RECEIVE_FILE = "RECEIVE_FILE";
export const RECEIVE_FILE_ERRORS = "RECEIVE_FILE_ERRORS";


export const receiveFile = file => ({
    type: RECEIVE_FILE,
    file
});
export const receiveFileErrors = errors => ({
    type: RECEIVE_FILE_ERRORS,
    errors
});

const uploadAPIRequest = data => (
    axios.post('/files', data)
);

export const uploadFile = data => dispatch => {
    return uploadAPIRequest(data).then(response => (
        dispatch(receiveFile(response.data))
        ), error => (
            dispatch(receiveFileErrors(error.responseJSON))
    ));
};