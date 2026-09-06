import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
    label: string;
    error?: string;
};

export const Input = ({ label, error, className, ...rest }: Props) => {
    return (
        <View className="w-full mb-4">
            <Text className="text-base font-semibold text-[#3D3B6B] dark:text-[#E5E4FA] mb-1 ml-2">
                {label}
            </Text>
            <TextInput
                placeholderTextColor="#9A98C0"
                className={`w-full h-[50px] rounded-2xl px-5 border-2 text-[#3D3B6B] dark:text-white ${
                    error ? "border-red-500" : "border-[#7573A8] dark:border-[#9A98D1]"
                } ${className ?? ""}`}
                {...rest}
            />
            {error ? <Text className="text-red-500 text-xs mt-1 ml-3">{error}</Text> : null}
        </View>
    );
};