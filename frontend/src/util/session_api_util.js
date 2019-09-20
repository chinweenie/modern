import axios from 'axios';

export const signup = (userData) => (
  axios.post('/api/users/register', userData)
);

export const login = (userData) => (
  axios.post('/api/users/login', userData)
)

export const logout = () => (
  axios.delete('/api/users/logout')
)

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};