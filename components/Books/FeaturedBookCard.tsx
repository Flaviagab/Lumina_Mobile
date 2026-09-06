import { Button } from "@/components/Button";
import { api } from "@/services/api";
import type { Book } from "@/types/book";
import { Image, Text, View } from "react-native";

type FeaturedBookCardProps = {
    book: Book;
    onRead?: (book: Book) => void;
    onViewMore?: (book: Book) => void;
};

export function FeaturedBookCard({ book, onRead, onViewMore }: FeaturedBookCardProps) {
    const imageUrl = book.capa_imagem
        ? `${api.defaults.baseURL}/uploads/${book.capa_imagem}`
        : null;

    return (
        <View className="w-64 mr-4 bg-cardBg dark:bg-dark-cardBg border border-borderPrimary dark:border-dark-borderPrimary rounded-2xl overflow-hidden shadow-sm">
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    className="w-full h-60"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-full h-60 bg-gray-300 dark:bg-gray-600" />
            )}

            <View className="p-3">
                <Text
                    numberOfLines={2}
                    className="text-base font-semibold text-textPrimary dark:text-dark-textPrimary mb-1"
                >
                    {book.titulo}
                </Text>

                <Text
                    numberOfLines={1}
                    className="text-xs text-textPrimary dark:text-dark-textPrimary opacity-80 mb-0.5"
                >
                    {book.autor?.nome}
                </Text>

                {book.editora ? (
                    <Text
                        numberOfLines={1}
                        className="text-xs text-textPrimary dark:text-dark-textPrimary opacity-60 mb-3"
                    >
                        {book.editora.nome}
                    </Text>
                ) : null}

                <View className="gap-2">
                    <Button
                        variant="filled"
                        onPress={() => onRead?.(book)}
                        className="w-full h-9 mb-0"
                    >
                        Leia agora
                    </Button>

                    <Button
                        variant="outline"
                        onPress={() => onViewMore?.(book)}
                        className="w-full h-9 mb-0"
                    >
                        Ver mais
                    </Button>
                </View>
            </View>
        </View>
    );
}