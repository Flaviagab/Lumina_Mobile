import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

const HOST = Platform.select({
    android: "http://10.0.2.2:3000",
    ios: "http://localhost:3000",
});

export const api = axios.create({
    baseURL: HOST,
    timeout: 10000
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});