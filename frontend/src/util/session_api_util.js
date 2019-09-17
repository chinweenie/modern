import axios from 'axios';

export const signup = (userData) => {
  const user = axios.post('/api/users/register', userData);
  debugger;
  return user;
};

export const login = (userData) => {

  return axios.post('/api/users/login', userData);
}

export const logout = () => {
  return axios.delete('/api/logout');
}

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};