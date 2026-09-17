import { getProfile } from "@/services/users";
import { User } from "@/types/users";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { onUnauthorized } from "./AuthEvents";

type AuthContextData = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    async function loadUser() {
         try {
        const profile = await getProfile();

        if (!profile.ok) {
            setUser(null);
            setIsAuthenticated(false);
            return;
        }

        setUser(profile.data as User);
        setIsAuthenticated(true);
    } catch (erro) {
        setUser(null);
        setIsAuthenticated(false);
    }
    }

    useEffect(() => {
        async function loadToken() {
            const token = await SecureStore.getItemAsync("token");

            if (token) {
                await loadUser();
            }

            setIsLoading(false);
        }

        loadToken();
    }, []);

    async function login(token: string) {
        await SecureStore.setItemAsync("token", token);
        await loadUser();
    }

    async function logout() {
        await SecureStore.deleteItemAsync("token");
        setUser(null);
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
                user,
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