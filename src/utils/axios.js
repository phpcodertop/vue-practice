import axios from "axios";
import router from '@/router';

const connection = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

connection.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status == 401) {
        router.push('/login');
    }
    return Promise.reject(error);
});
