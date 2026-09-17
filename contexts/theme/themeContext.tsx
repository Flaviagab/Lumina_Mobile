import { DARK, FONT, FONT_SIZE, RADIUS, SPACE, THEMES } from "@/contexts/theme/theme";
import { useColorScheme } from "nativewind";
import { createContext, useContext, useMemo } from "react";

type ThemeColor = "light" | "dark";

type ThemeContextType = {
    currentColor: ThemeColor;
    theme: typeof DARK;
    font: typeof FONT;
    fontSize: typeof FONT_SIZE;
    space: typeof SPACE;
    radius: typeof RADIUS;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const color: ThemeColor = colorScheme === "dark" ? "dark" : "light";
    const theme = THEMES[color];

    const value = useMemo(
        () => ({
            currentColor: color,
            theme,
            font: FONT,
            fontSize: FONT_SIZE,
            radius: RADIUS,
            space: SPACE,
            toggleTheme: toggleColorScheme,
        }),
        [color, theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error("useTheme precisa ser usado dentro de um <ThemeProvider>");
    }
    return context;
};