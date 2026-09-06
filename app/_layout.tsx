import { FontProvider } from "@/components/FontProvider";
import { AuthProvider, useAuth } from "@/contexts/auth/AuthContext";
import { ThemeProvider } from "@/contexts/theme/themeContext";
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from "react-native";
import 'react-native-reanimated';
import "../global.css";

export default function RootLayout() {
    return (
        <AuthProvider>
            <FontProvider>
                <ThemeProvider>
                    <RootNavigator />
                </ThemeProvider>
            </FontProvider>
        </AuthProvider>
    );
}

function RootNavigator() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isAuthenticated}>
                <Stack.Screen name="(initial)" />
            </Stack.Protected>
            <Stack.Protected guard={!isAuthenticated}>
                <Stack.Screen name="(auth)/login" />
                <Stack.Screen name="(auth)/register" />
            </Stack.Protected>
        </Stack>
    );
}