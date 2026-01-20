import axios from "axios";


const api = axios.create({
  baseURL: "https://weather-analytics-dashboar.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
