import { useAuth } from "@/contexts/auth/AuthContext";
import { Redirect, Slot } from "expo-router";

export default function AdminLayout() {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    if (user?.role !== "admin") {
        return <Redirect href="/home" />;
    }

    return <Slot />;
}