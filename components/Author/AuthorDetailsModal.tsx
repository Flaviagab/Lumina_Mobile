import type { Author } from "@/types/author";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type AuthorDetailsModalProps = {
    author: Author | null;
    visible: boolean;
    onClose: () => void;
};

export function AuthorDetailsModal({
    author,
    visible,
    onClose,
}: AuthorDetailsModalProps) {
    if (!author) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <View className="bg-bodyBg dark:bg-dark-bodyBg rounded-t-3xl max-h-[85%]">
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 24 }}
                    >
                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="text-2xl font-bold text-textPrimary dark:text-dark-textPrimary flex-1 mr-3">
                                {author.name}
                            </Text>

                            <Pressable onPress={onClose}>
                                <Text className="text-lg text-textPrimary dark:text-dark-textPrimary">
                                    Fechar
                                </Text>
                            </Pressable>
                        </View>

                        <Text className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                            Biografia
                        </Text>

                        <Text className="text-base text-textPrimary dark:text-dark-textPrimary mb-5">
                            {author.bio || "Nenhuma biografia disponível."}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
