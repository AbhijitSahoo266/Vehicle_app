import axios from "axios";
import ENV from "../config/env";
import { getToken } from "../services/storage/secureStorage";

const api = axios.create({
  baseURL: ENV.BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log("Token read error:", error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default api;