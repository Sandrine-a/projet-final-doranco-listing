import axios from "axios";
import { TASKS_API_ENDPOINT } from "../settings";

const ApiManager = axios.create({
  baseURL: TASKS_API_ENDPOINT,
  responseType: "json",
  // withCredentials: "true",
});

export default ApiManager;
