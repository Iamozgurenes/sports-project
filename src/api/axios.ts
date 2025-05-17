import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
    },
    });

    export default api;