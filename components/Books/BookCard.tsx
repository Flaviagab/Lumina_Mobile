// components/Book/BookCard.tsx
import { Button } from "@/components/Button";
import { api } from "@/services/api";
import type { Book } from "@/types/book";
import { Image, Text, View } from "react-native";

type BookCardProps = {
    book: Book;
    onRead?: (book: Book) => void;
    onViewMore?: (book: Book) => void;
};

export function BookCard({ book, onRead, onViewMore }: BookCardProps) {
    
    const imageUrl = book.capa_imagem
        ? `${api.defaults.baseURL}/uploads/${book.capa_imagem}`
        : null;

    return (
        <View className="flex-row bg-cardBg dark:bg-dark-cardBg border border-borderPrimary dark:border-dark-borderPrimary rounded-md mb-4 overflow-hidden shadow-sm">
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    className="w-28 h-full"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-28 bg-gray-300 dark:bg-gray-600" />
            )}

            <View className="flex-1 p-4 justify-center">
                <Text
                    numberOfLines={2}
                    className="text-lg font-medium text-textPrimary dark:text-dark-textPrimary mb-1"
                >
                    {book.titulo}
                </Text>

                <Text
                    numberOfLines={1}
                    className="text-sm text-textPrimary dark:text-dark-textPrimary mb-1 opacity-80"
                >
                    {book.autor?.nome}
                </Text>

                {book.editora ? (
                    <Text
                        numberOfLines={1}
                        className="text-xs text-textPrimary dark:text-dark-textPrimary mb-2 opacity-60"
                    >
                        {book.editora.nome}
                    </Text>
                ) : null}

                <View className="flex-row gap-2 pt-1">
                    <Button
                        variant="filled"
                        onPress={() => onRead?.(book)}
                        className="w-auto flex-1 h-10 mb-0"
                    >
                        Leia agora
                    </Button>

                    <Button
                        variant="outline"
                        onPress={() => onViewMore?.(book)}
                        className="w-auto flex-1 h-10 mb-0"
                    >
                        Ver mais
                    </Button>
                </View>
            </View>
        </View>
    );
}