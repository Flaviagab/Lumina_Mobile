import { BookList } from "@/components/Books/BookList";
import { H1 } from "@/components/Text";
import { getBooks } from "@/services/books";
import type { Book } from "@/types/book";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Books() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function loadBooks() {
            const response = await getBooks();

            if (response.ok) {
                setBooks(response.data);
            } else {
                console.log("Erro ao buscar livros:", response.data);
            }
        }

        loadBooks();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <View className="items-center">
                <H1>Livros</H1>
            </View>
            <BookList
                books={books}
                onRead={(book) => console.log("Ler livro:", book)}
                onViewMore={(book) => console.log("Ver mais do livro:", book)}
            />
        </SafeAreaView>
    );
}