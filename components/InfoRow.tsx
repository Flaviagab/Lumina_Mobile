import { Text, View } from "react-native";

type InfoRowProps = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View className="gap-1 ml-8 w-full">
      <Text className="font-bold text-bodyColor/70 dark:text-dark-bodyColor/70 text-sm">
        {label}
      </Text>
      <Text className="text-bodyColor dark:text-dark-bodyColor text-lg">
        {value}
      </Text>
    </View>
  );
}