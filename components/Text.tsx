import { useTheme } from "@/contexts/theme/themeContext";
import { Text } from "react-native";

type Props = {
    children: React.ReactNode
}
export const H1 = (props: Props) => {
    const { theme, font, fontSize } = useTheme()
    return (
        <Text
            style={{
                color: theme.bodyColor,
                fontSize: fontSize.h1,
                fontFamily: font.baseBold,
            }}
        >{props.children}</Text>
    );
}

export const H2 = (props: Props) => {
    const { theme, font, fontSize } = useTheme()
    return (
        <Text
            style={{
                color: theme.bodyColor,
                fontSize: fontSize.h2,
                fontFamily: font.baseBold,
            }}
        >{props.children}</Text>
    );
    
}


export const H3 = (props: Props) => {
    const { theme, font, fontSize } = useTheme()
    return (
        <Text
            style={{
                color: theme.bodyColor,
                fontSize: fontSize.h4,
                fontFamily: font.base,
            }}
        >{props.children}</Text>
    );}