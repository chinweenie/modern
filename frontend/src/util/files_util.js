import axios from 'axios';
export const getAllFilesByEmail = email => {
    return axios.get(`/fetchAll/${email}`);
};

export const postToCloudinary = data => (
    axios.post('/files', data)
);

export const deleteFileByEmailAndFileName = (email, filename) => (
    axios.delete(`/deleteFile/${email}/${filename}`)
)