import type { Book } from "@/types/book";
import { FlatList, Text, View } from "react-native";
import { FeaturedBookCard } from "./FeaturedBookCard";

type BooksCarouselProps = {
    title: string;
    books: Book[];
    onRead?: (book: Book) => void;
    onViewMore?: (book: Book) => void;
};

export function BooksCarousel({
    title,
    books,
    onRead,
    onViewMore,
}: BooksCarouselProps) {
    if (books.length === 0) return null;

    return (
        <View className="mt-5 mb-10">
            <Text className="text-2xl font-semibold text-textPrimary dark:text-dark-textPrimary px-4 mb-3">
                {title}
            </Text>

            <FlatList
                data={books}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingLeft: 16 }}
                renderItem={({ item }) => (
                    <FeaturedBookCard
                        book={item}
                        onRead={onRead}
                        onViewMore={onViewMore}
                    />
                )}
            />
        </View>
    );
}
