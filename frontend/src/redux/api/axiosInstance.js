import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Optional: interceptors for auth token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // or Redux state
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
