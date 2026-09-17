import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

type Option<T> = {
    label: string;
    value: T;
};

type Props<T> = {
    label: string;
    placeholder?: string;
    value?: T;
    options: Option<T>[];
    onChange: (value: T) => void;
};

export function Select<T extends string | number>({
    label,
    placeholder = "Selecione",
    value,
    options,
    onChange,
}: Props<T>) {
    const [open, setOpen] = useState(false);

    const selected = options.find((option) => option.value === value);

    return (
        <View className="w-full mb-4">
            <Text className="text-base font-semibold text-[#3D3B6B] dark:text-[#E5E4FA] mb-1 ml-2">
                {label}
            </Text>

            <Pressable
                onPress={() => setOpen(true)}
                className="w-full h-[50px] rounded-2xl px-5 border-2 border-[#7573A8] dark:border-[#9A98D1] justify-center"
            >
                <Text className={selected ? "text-[#3D3B6B] dark:text-white" : "text-[#9A98C0]"}>
                    {selected ? selected.label : placeholder}
                </Text>
            </Pressable>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable className="flex-1 bg-black/40 justify-center items-center px-6" onPress={() => setOpen(false)}>
                    <Pressable className="w-full max-h-[60%] bg-cardBg dark:bg-dark-cardBg rounded-3xl overflow-hidden">
                        <Text className="text-lg font-semibold text-[#3D3B6B] dark:text-[#E5E4FA] px-5 pt-5 pb-2">
                            {label}
                        </Text>

                        <FlatList
                            data={options}
                            keyExtractor={(item) => String(item.value)}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => {
                                        onChange(item.value);
                                        setOpen(false);
                                    }}
                                    className="px-5 py-4 border-t border-textPrimary/10 dark:border-dark-textPrimary/10"
                                >
                                    <Text
                                        className={
                                            item.value === value
                                                ? "text-[#7573A8] dark:text-[#9A98D1] font-semibold"
                                                : "text-textPrimary dark:text-dark-textPrimary"
                                        }
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}