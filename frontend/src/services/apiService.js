import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchClients = () => axios.get(`${API_BASE_URL}/users`);
export const addClient = (clientData) =>
  axios.post(`${API_BASE_URL}/users`, clientData);
export const optimizeRoute = () =>
  axios.get(`${API_BASE_URL}/users/optimize-route`);
