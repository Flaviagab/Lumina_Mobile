import { useTheme } from "@/contexts/theme/themeContext";
import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, Text } from "react-native";

type IconButtonProps = {
    icon: ComponentProps<typeof Feather>["name"];
    onPress?: () => void;
    children: string;
    variant?: "default" | "danger";
};

export const IconButton = (props: IconButtonProps) => {
    const { theme } = useTheme();
    const { icon, onPress, children, variant = "default" } = props;

    const textStyle = variant === "danger" ? "text-red-500" : "text-bodyColor dark:text-dark-bodyColor";
    const iconColor = variant === "danger" ? "#DC2626" : theme.bodyColor;

    return (
        <Pressable onPress={onPress} hitSlop={8} className="flex-row items-center gap-2 py-2">
            <Feather
                name={icon}
                size={18}
                color={iconColor}
            />
            <Text className={`font-bold ${textStyle}`}>{children}</Text>
        </Pressable>
    );
};