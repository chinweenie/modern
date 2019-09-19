import axios from 'axios';
export const fetchAll = email => {
    return axios.get(`/fetchAll/${email}`);
};

export const uploadAPIRequest = data => (
    axios.post('/files', data) //to cloudinary
);