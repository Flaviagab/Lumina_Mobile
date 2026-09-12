import { BookList } from "@/components/Books/BookList";
import { BookDetailsModal } from "@/components/Books/BooksDetailsModal";
import { H1 } from "@/components/Text";
import { getBookPdfUrl, getBooks } from "@/services/books";
import type { Book } from "@/types/book";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    async function handleReadBook(book: Book) {
        const pdfUrl = getBookPdfUrl(book.pdfFile);
        router.push({
            pathname: "/(pdfViewer)",
            params: { url: pdfUrl },
        });
    }

    function handleViewMore(book: Book) {
        setSelectedBook(book);
    }

    useFocusEffect(
        useCallback(() => {
            async function loadBooks() {
                const response = await getBooks();

                if (response.ok) {
                    setBooks(response.data);
                } else {
                    console.log("Erro ao buscar livros:", response.data);
                }
            }

            loadBooks();
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <View className="items-center">
                <H1>Livros</H1>
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