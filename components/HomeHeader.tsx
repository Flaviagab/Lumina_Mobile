import { useTheme } from "@/contexts/theme/themeContext";
import { View } from "react-native";
import { H1, H3 } from "./Text";

type Props = {
    userName: string,
}

export const HomeHeader = (props: Props) => {
    const { theme, radius, space, toggleTheme } = useTheme();

    return (
        <View className="w-full rounded-b-[30px] px-6 pt-20 pb-6"
            style={{ backgroundColor: theme.secondaryBg }}>

            <H3 color={theme.primaryText}>Olá, {props.userName}</H3>
            <H1 color={theme.primaryText}>Ilumine sua leitura</H1>


        </View>
    )
}