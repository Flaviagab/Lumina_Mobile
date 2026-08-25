import { Image } from "expo-image";
import { View } from "react-native";

type Props = {
  fotoUrl: string;
};

export const ProfilePicture = (props: Props) => {
  return (
    <View className="w-[200px] h-[200px] rounded-full mb-5 border border-bodyColor dark:border-dark-bodyColor overflow-hidden">
      <Image
        source={{ uri: props.fotoUrl }}
        className="w-full h-full"
      />
    </View>
  );
};