import axios from 'axios';
export const getAllFilesByUserId = user_id => (
    axios.get(`/fetchAll/${user_id}`)
);

export const postToCloudinary = data => (
    axios.post('/files', data)
);

export const deleteFileByUserIdAndFileName = (user_id, filename) => (
    axios.delete(`/deleteFile/${user_id}/${filename}`)
);