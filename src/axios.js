import axios from 'axios';

const instance = axios.create({
   baseURL: process.env.REACT_APP_SERVER_URL || "https://hotels-api-9t6e.onrender.com"
})

instance.interceptors.request.use((config) => {
   config.headers.Authorization = window.localStorage.getItem('token')
   return config;
})

export default instance;