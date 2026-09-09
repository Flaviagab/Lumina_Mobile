import { View } from "react-native";
import { H1 } from "./Text";

type PageHeaderProps = {
    title: string;
    subtitle?: string;
};

export function PageHeader({ title }: PageHeaderProps) {
    return (
        <View className="mb-8 items-center">
            <H1>
                {title}
            </H1>
        </View>
    );
}