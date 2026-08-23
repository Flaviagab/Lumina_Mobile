import { DARK, FONT, FONT_SIZE, LIGHT, RADIUS, SPACE } from "@/contexts/theme/theme";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";


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
    const colorSchema = useColorScheme();
    const [color, setColor] = useState<ThemeColor>((colorSchema as ThemeColor) ?? "light");
    const [theme, setTheme] = useState(colorSchema === "light" ? LIGHT : DARK);

    const toggleTheme = () => {
        if (color === "light") {
            setTheme(DARK);
            setColor("dark");
        } else {
            setTheme(LIGHT);
            setColor("light");
        }
    };

    useEffect(() => {
        if (colorSchema === "light") {
            setTheme(LIGHT);
            setColor("light");
        } else {
            setTheme(DARK);
            setColor("dark");
        }
    }, [colorSchema]);

    return (
        <ThemeContext.Provider
            value={{
                currentColor: color,
                theme: theme,
                font: FONT,
                fontSize: FONT_SIZE,
                radius: RADIUS,
                space: SPACE,
                toggleTheme: toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error("useTheme precisa ser usado dentro de um <ThemeProvider>");
    }
    return context;
};