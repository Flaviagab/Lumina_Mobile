// components/Book/BookList.tsx
import type { Book } from "@/types/book";
import { FlatList } from "react-native";
import { BookCard } from "./BookCard";

type BookListProps = {
    books: Book[];
    onRead?: (book: Book) => void;
    onViewMore?: (book: Book) => void;
};

export function BookList({ books, onRead, onViewMore }: BookListProps) {
    return (
        <FlatList
            data={books}
            keyExtractor={(item) => String(item.id_livro)}
            renderItem={({ item }) => (
                <BookCard
                    book={item}
                    onRead={onRead}
                    onViewMore={onViewMore}
                />
            )}
            contentContainerClassName="px-4 pt-4 pb-8"
        />
    );
}