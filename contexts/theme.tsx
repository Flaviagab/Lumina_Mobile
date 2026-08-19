import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const DARK = {
    bodyBg: "#070709",
    secondaryBg: "#5A0CA2",
    tertiaryBg: "#181824",
    borderColor: "#252535",
    primary: "#C8FF00",
    primaryText: "#000000",
    danger: "#FF3A2D",
    success: "#00CC6A",
    bodyColor: "#F2F2F8",
    secondaryColor: "#6B6B80",
    tertiaryColor: "#3F3F50",
    backdrop: "rgba(0,0,0,0.6)",
};

const LIGHT = {
    bodyBg: "#F4F4EF",
    secondaryBg: "#FAFAF7",
    tertiaryBg: "#FFFFFF",
    borderColor: "#E2E2DC",
    primary: "#0F0F1A",
    primaryText: "#F2F2F8",
    danger: "#FF3A2D",
    success: "#00A855",
    bodyColor: "#0A0A12",
    secondaryColor: "#656570",
    tertiaryColor: "#A0A0AA",
    backdrop: "rgba(0,0,0,0.15)",
};

const FONT = {
    headingFamily: "Lato_900Black",
    base: "Lato_400Regular",
    baseBold: "Lato_700Bold",
};

const FONT_SIZE = {
    sm: 11,
    base: 13,
    lg: 15,
    h4: 17,
    h3: 22,
    h2: 28,
    h1: 34,
    display: 52,
};

const SPACE = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 48,
    9: 64,
};

const RADIUS = {
    sm: 4,
    base: 8,
    lg: 14,
    xl: 20,
    circle: 9999,
};

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