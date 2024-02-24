import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export default apiClient;
