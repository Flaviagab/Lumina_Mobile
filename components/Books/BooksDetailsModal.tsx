import type { Book } from "@/types/book";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type BookDetailsModalProps = {
    book: Book | null;
    visible: boolean;
    onClose: () => void;
};

export function BookDetailsModal({
    book,
    visible,
    onClose,
}: BookDetailsModalProps) {
    if (!book) return null;

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
                                {book.title}
                            </Text>

                            <Pressable onPress={onClose}>
                                <Text className="text-lg text-textPrimary dark:text-dark-textPrimary">
                                    Fechar
                                </Text>
                            </Pressable>
                        </View>

                        <Text className="text-base text-textPrimary dark:text-dark-textPrimary mb-5">
                            {book.description}
                        </Text>

                        <Text className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                            Autor
                        </Text>

                        <Text className="text-base text-textPrimary dark:text-dark-textPrimary mb-5">
                            {book.author.name}
                        </Text>

                        <Text className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                            Categoria
                        </Text>

                        <Text className="text-base text-textPrimary dark:text-dark-textPrimary mb-5">
                            {book.category.name}
                        </Text>

                        <Text className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                            Editora
                        </Text>

                        <Text className="text-base text-textPrimary dark:text-dark-textPrimary mb-5">
                            {book.publisher.nome}
                        </Text>

                        {book.collection && (
                            <>
                                <Text className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                    Coleção
                                </Text>

                                <Text className="text-base text-textPrimary dark:text-dark-textPrimary mb-5">
                                    {book.collection.nome}
                                </Text>
                            </>
                        )}

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
