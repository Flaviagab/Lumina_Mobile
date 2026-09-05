import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { onUnauthorized } from "./AuthEvents";

type AuthContextData = {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadToken() {
            const token = await SecureStore.getItemAsync("token");

            setIsAuthenticated(!!token);
            setIsLoading(false);
        }

        loadToken();
    }, []);

    async function login(token: string) {
        await SecureStore.setItemAsync("token", token);
        setIsAuthenticated(true);
    }

    async function logout() {
        await SecureStore.deleteItemAsync("token");
        setIsAuthenticated(false);
    }

    useEffect(() => {
    const unsubscribe = onUnauthorized(() => {
        logout();
    });
    return unsubscribe;
}, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}