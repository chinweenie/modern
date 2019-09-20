import axios from 'axios';

export const getAllUsersRequest = () => (
    axios.get('/api/users')
);