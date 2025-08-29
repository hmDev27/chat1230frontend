import axios from "axios";

// First define BASE_URL
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://c9093134-dfde-48fc-8111-d6c92a2aff0e-00-11l4cpgtjwwmj.sisko.replit.dev";

// Then use it in axios configuration
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});