import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 7000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export default apiClient;
