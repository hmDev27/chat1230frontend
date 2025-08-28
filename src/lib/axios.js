import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://192.168.1.104:5001/api" : "/api",
    withCredentials: true,
})