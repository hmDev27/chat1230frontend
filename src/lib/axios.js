import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://192.168.124.2:5001/api" : "/api",
    withCredentials: true,
})