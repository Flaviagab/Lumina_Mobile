import { useTheme } from "@/contexts/theme/themeContext";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

type EditPhotoButtonProps = {
  onPress: () => void;
};

export const EditPhotoButton = ({ onPress }: EditPhotoButtonProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      className="absolute bottom-4 right-4 bg-secondaryBg dark:bg-dark-secondaryBg w-11 h-11 rounded-full items-center justify-center border-2 border-bodyBg dark:border-dark-bodyBg"
    >
      <Feather name="edit-2" size={16} color={theme.bodyColor} />
    </Pressable>
  );
};