import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const HOST = Platform.select({
    android: "http://10.0.2.2:3000",
    ios: "http://localhost:3000",
    default: "//localhost:3000"
});

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