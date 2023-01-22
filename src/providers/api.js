import axios from "axios";
import { API_ENDPOINT } from "../settings";

const apiManager = axios.create({
  baseURL: API_ENDPOINT,
  headers: { "Content-Type": "application/json" },
  // withCredentials: "true",
});

export default apiManager;
