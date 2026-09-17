import { emitUnauthorized } from "@/contexts/auth/AuthEvents";
import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
export const HOST = debuggerHost
    ? `http://${debuggerHost}:3000`
    : "http://192.168.1.163:3000";

export const api = axios.create({
    baseURL: HOST,
    timeout: 10000
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            emitUnauthorized();
        }
        return Promise.reject(error);
    }
);