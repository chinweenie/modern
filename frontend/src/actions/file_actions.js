import axios from 'axios';
import * as FilesApiUtil from '../util/files_util';
export const RECEIVE_FILE = "RECEIVE_FILE";
export const RECEIVE_FILE_ERRORS = "RECEIVE_FILE_ERRORS";
export const RECEIVE_FILES = 'RECEIVE_FILES';

export const receiveFile = file => ({
    type: RECEIVE_FILE,
    file
});

export const receiveFiles = files => ({
    type: RECEIVE_FILES,
    files
})

export const receiveFileErrors = errors => ({
    type: RECEIVE_FILE_ERRORS,
    errors
});

const uploadAPIRequest = data => (
    axios.post('/files', data)   //$.ajax( url: '/files', data: {data})
);

export const uploadFile = data => dispatch => {
    return uploadAPIRequest(data).then(response => (
        dispatch(receiveFile(response.data))
        ), error => (
            dispatch(receiveFileErrors(error.responseJSON))
    ));
};

export const fetchAll = email => dispatch => {
    return FilesApiUtil.fetchAll(email).then(response => (
        dispatch(receiveFiles(response.data))
    ), error => (
        dispatch(receiveFileErrors(error.responseJSON))
    ));
};