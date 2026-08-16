import { Text, TouchableOpacity } from "react-native";

type Props = {
    children: string;
    onPress?: () => void;
    variant?: "filled" | "outline";
}

export const Button = (props: Props) => {
    const buttonStyle = props.variant === "outline" ? "bg-transparent border-2 border-[#7573A8] dark:border-[#9A98D1]" : "bg-[#7573A8] dark:bg-[#9A98D1]";
    const textStyle = props.variant === "outline" ? "text-[#7573A8] dark:text-[#9A98D1]" : "text-white";

    return (
        <TouchableOpacity onPress={props.onPress} className={`w-40 h-[50px] rounded-full justify-center items-center mb-5 ${buttonStyle}`}>
            <Text className={`font-bold text-xl ${textStyle}`}>{props.children}</Text>
        </TouchableOpacity>
    )
}   