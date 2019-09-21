import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY;
export const getEmbedData = URL => (
    axios.get(`http://api.linkpreview.net/?key=${API_KEY}&q=${URL}`)
);