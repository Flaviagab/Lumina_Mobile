import { H3 } from "@/components/Text";
import { Pressable } from "react-native";

type PanelCardProps = {
    title: string;
    onPress: () => void;
};

export function PanelCard({ title, onPress }: PanelCardProps) {
    return (
        <Pressable
            onPress={onPress}
            className="w-full h-28 items-center justify-center rounded-2xl border border-textPrimary/50 dark:border-dark-textPrimary/50 bg-cardBg dark:bg-dark-cardBg"
        >

            <H3
                className="font-bold text-textPrimary dark:text-dark-textPrimary">
                {title}
            </H3>

        </Pressable>
    );
}
