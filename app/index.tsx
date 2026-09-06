import { useAuth } from "@/contexts/auth/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
    const { isAuthenticated } = useAuth();

    return <Redirect href={isAuthenticated ? "/home" : "/login"} />;
}