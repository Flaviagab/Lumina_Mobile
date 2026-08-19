import { Text, View } from "react-native";


type Props = {
    userName: string,
    explore: () => void;
    profile: () => void;
}

export const HomeHeader = (props: Props) => {
    return (
        <View className="w-full bg-purple-400 dark:bg-purple-800 rounded-b-[30px] px-6 pt-12 pb-6">

            <Text className="mt-2 text-3xl font-bold text-white">Lumina</Text>

            <View className="mt-8 flex-row items-center gap-4">

                <Text >Olá, {props.userName}</Text>
                <Text >Ilumine sua leitura</Text>

                

            </View>

           
        </View>
    )
}