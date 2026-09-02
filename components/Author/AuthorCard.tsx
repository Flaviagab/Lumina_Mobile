import { Button } from "@/components/Button";
import { api } from "@/services/api";
import type { Author } from "@/types/author";
import { Image, Text, View } from "react-native";

type AuthorCardProps = {
    author: Author;
    onViewBooks?: (author: Author) => void;
    onViewMore?: (author: Author) => void;
};

export function AuthorCard({ author, onViewBooks, onViewMore }: AuthorCardProps) {
    const imageUrl = author.foto
        ? `${api.defaults.baseURL}/uploads/${author.foto}`
        : null;

    return (
        <View className="flex-row bg-cardBg dark:bg-dark-cardBg rounded-md mb-4 overflow-hidden border border-borderPrimary dark:border-dark-borderPrimary">
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
                    className="text-lg font-medium text-textPrimary dark:text-dark-textPrimary mb-3"
                >
                    {author.nome}
                </Text>

                <View className="flex-row gap-2">
                    <Button
                        variant="filled"
                        onPress={() => onViewBooks?.(author)}
                        className="w-auto flex-1 h-10 mb-0"
                    >
                        Ver Livros
                    </Button>

                    <Button
                        variant="outline"
                        onPress={() => onViewMore?.(author)}
                        className="w-auto flex-1 h-10 mb-0"
                    >
                        Ver mais
                    </Button>
                </View>
            </View>
        </View>
    );
}