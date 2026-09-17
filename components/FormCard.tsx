import { ReactNode } from "react";
import { View } from "react-native";

type FormCardProps = {
    children: ReactNode;
};

export function FormCard({ children }: FormCardProps) {
    return (
        <View className="w-full rounded-2xl border border-textPrimary/15 dark:border-dark-textPrimary/15 bg-cardBg dark:bg-dark-cardBg p-5 mb-5">
            {children}
        </View>
    );
}