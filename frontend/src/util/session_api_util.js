import axios from 'axios';

export const signup = (userData) => {
  return axios.post('api/users/register', userData);
};

export const login = (userData) => {
  return axios.post('/api/users/login', userData)
}

export const logout = () => {
  return axios.delete('/api/logout')
}