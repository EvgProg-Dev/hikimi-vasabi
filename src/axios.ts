import axios from "axios";

const instanse = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});



instanse.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
})

export default instanse;
