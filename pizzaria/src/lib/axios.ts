import axios from "axios";
import { env } from "../env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

// Interceptor para incluir o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
