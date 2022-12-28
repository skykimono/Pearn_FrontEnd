import axios from 'axios'
import { API_BASE_URL } from '../config/index'

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
})
axiosClient.interceptors.request.use(function (config) {
    let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
    config.headers.Authorization = token ? token : null;
    return config;
});

export default axiosClient