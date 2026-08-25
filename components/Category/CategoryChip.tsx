import { Pressable, Text } from "react-native";

type Props = {
    label: string;
    selected?: boolean;
    onPress: () => void;
};

export const CategoryChip = ({ label, selected, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            className={`bg-transparent border rounded-3xl px-10 py-5 ${
                selected ? "border-secondaryBg dark:border-dark-primaryText" : "border-bodyColor dark:border-dark-bodyColor"
            }`}
        >
            <Text
                className={`font-bold text-sm ${
                    selected ? "text-secondaryBg dark:text-dark-primaryText" : "text-bodyColor dark:text-dark-bodyColor"
                }`}
            >
                {label}
            </Text>
        </Pressable>
    );
};