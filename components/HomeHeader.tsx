import { useTheme } from "@/contexts/theme/themeContext";
import { View } from "react-native";
import { H1, H3 } from "./Text";
type Props = {
    userName: string,
}

export const HomeHeader = (props: Props) => {
    const { theme, radius, space } = useTheme();
    return (
        <View className="w-full rounded-b-[30px] px-6 pt-12 pb-6"
            style={{ backgroundColor: theme.secondaryBg }}>

            <H3>Olá, {props.userName}</H3>

            <H1>Ilumine sua leitura</H1>


        </View>
    )
}