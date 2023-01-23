import { Platform } from "react-native";
import React from "react";

import axios from "axios";
import {
  API_ENDPOINT_ANDROID,
  API_ENDPOINT_IOS,
} from "../settings";
import { API_ENDPOINT } from "../settings";

const apiManager = axios.create({
  baseURL: Platform.OS === "ios" ? API_ENDPOINT_IOS : API_ENDPOINT_ANDROID,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

export default apiManager;
