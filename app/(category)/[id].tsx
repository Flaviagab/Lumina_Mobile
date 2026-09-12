import { BackButton } from "@/components/BackButton";
import { BookList } from "@/components/Books/BookList";
import { BookDetailsModal } from "@/components/Books/BooksDetailsModal";
import { H1 } from "@/components/Text";
import { getBookPdfUrl, getBooksByCategory } from "@/services/books";
import type { Book } from "@/types/book";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryBooks() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    function handleReadBook(book: Book) {
        const pdfUrl = getBookPdfUrl(book.pdfFile);
        router.push({
            pathname: "/(pdfViewer)",
            params: { url: pdfUrl },
        });
    }

    function handleViewMore(book: Book) {
        setSelectedBook(book);
    }

    useEffect(() => {
        async function loadBooks() {
            if (!id) return;

            const response = await getBooksByCategory(Number(id));

            if (response.ok) {
                setBooks(response.data);
            } else {
                console.log(
                    "Erro ao buscar livros da categoria:",
                    response.data
                );
            }
        }

        loadBooks();
    }, [id]);

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <BackButton />

            <View className="items-center mt-4 ml-14">
                <H1>Livros da categoria</H1>
            </View>

            <BookList
                books={books}
                onRead={handleReadBook}
                onViewMore={handleViewMore}
            />

            <BookDetailsModal
                book={selectedBook}
                visible={selectedBook !== null}
                onClose={() => setSelectedBook(null)}
            />
        </SafeAreaView>
    );
}