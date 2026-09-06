import { useTheme } from "@/contexts/theme/themeContext";
import { View } from "react-native";
import { H1 } from "./Text";


export const HomeHeader = () => {
    const { theme, radius, space, toggleTheme } = useTheme();

    return (
        <View className="w-full rounded-b-[30px] px-6 pt-20 pb-6"
            style={{ backgroundColor: theme.secondaryBg }}>
                
            <H1 color={theme.primaryText}>Ilumine sua leitura</H1>


        </View>
    )
}