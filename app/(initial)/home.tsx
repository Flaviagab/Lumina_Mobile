import { HomeHeader } from "@/components/HomeHeader";
import { useTheme } from "@/contexts/theme";
import { View } from "react-native";

export default function Home() {
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.bodyBg }}>
            <HomeHeader
                userName="Ana Júlia"
            />
        </View>
    )
}