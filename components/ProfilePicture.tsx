import { api } from "@/services/api";
import { Image, View } from "react-native";

type Props = {
  fotoUrl?: string | null;
};

export const ProfilePicture = ({ fotoUrl }: Props) => {
  const isUriCompleta =
    fotoUrl?.startsWith("http") ||
    fotoUrl?.startsWith("file") ||
    fotoUrl?.startsWith("content");

  const imageUrl = !fotoUrl
    ? null
    : isUriCompleta
      ? fotoUrl
      : `${api.defaults.baseURL}/uploads/${fotoUrl}`;

  return (
    <View className=" w-[200px] h-[200px] rounded-full mb-5 border border-bodyColor dark:border-dark-bodyColor overflow-hidden items-center justify-center">
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} className="w-full h-full" />
      ) : (
        <Image
          source={require("@/assets/images/default-profile-picture.jpg")}
          className="w-full h-full"
        />
      )}
    </View>
  );
};