import axios from "axios";
import router from '@/router';
import store from "@/store";

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        store.dispatch('logout');
        router.push('/login');
    }
    return Promise.reject(error);
});

export const http = axiosInstance;
