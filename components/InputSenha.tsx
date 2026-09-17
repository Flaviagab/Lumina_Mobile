import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { Input } from "./Input";

type Props = TextInputProps & {
    label: string;
    error?: string;
};

export const InputSenha = (props: Props) => {
    const [visivel, setVisivel] = useState(false);

    return (
        <View className="relative w-full">
            <Input {...props} secureTextEntry={!visivel} />
            <TouchableOpacity
                onPress={() => setVisivel((v) => !v)}
                className="absolute right-4 top-[38px]"
                hitSlop={8}
            >
                <Feather name={visivel ? "eye-off" : "eye"} size={20} color="#7573A8" />
            </TouchableOpacity>
        </View>
    );
};