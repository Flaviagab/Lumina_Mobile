import { useRouter } from "expo-router";
import { View } from "react-native";
import { IconButton } from "./IconButton";

export function BackButton() {
    const router = useRouter();

    return (
        <View className="absolute top-20 left-6 z-10">
            <IconButton
                icon="arrow-left"
                onPress={() => router.back()}
            > </IconButton>
        </View>
    );
}