import axios from "axios";
import { API_ENDPOINT } from "../settings";

const apiManager = axios.create({
  baseURL: API_ENDPOINT,
 
});

export default apiManager;
