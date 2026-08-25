import { useTheme } from "@/contexts/theme/themeContext";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

export const ThemeButton = () => {
    const { theme, currentColor, toggleTheme } = useTheme();

    return (
        <Pressable onPress={toggleTheme} hitSlop={8}>
            <Feather
                name={currentColor === "dark" ? "sun" : "moon"}
                size={22}
                color={theme.bodyColor}
            />
        </Pressable>
    );
};