import { BackButton } from "@/components/BackButton";
import { PanelCard } from "@/components/PanelCard";
import { H1 } from "@/components/Text";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PANEL_OPTIONS = [
    {
        label: "Categorias",
        href: "/(admin)/categories",
    },
] as const;

export default function Panel() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <BackButton />

            <View className="flex-1 px-5 pt-5">
                <View className="items-center mb-10">
                    <H1>Painel</H1>
                </View>

                <View className="gap-4">
                    {PANEL_OPTIONS.map((option) => (
                        <PanelCard
                            key={option.href}
                            title={option.label}
                            onPress={() => router.push(option.href)}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}
