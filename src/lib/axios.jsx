import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: "https://p-chat-pro.onrender.com/api",
    // baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://p-chat-pro.onrender.com/api",
    withCredentials: true
})