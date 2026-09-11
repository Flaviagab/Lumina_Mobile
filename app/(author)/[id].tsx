import { BackButton } from "@/components/BackButton";
import { BookList } from "@/components/Books/BookList";
import { H1 } from "@/components/Text";
import { getBooksByAuthor } from "@/services/books";
import type { Book } from "@/types/book";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthorBooks() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function loadBooks() {
            if (!id) return;

            const response = await getBooksByAuthor(Number(id));

            if (response.ok) {
                setBooks(response.data);
            } else {
                console.log(
                    "Erro ao buscar livros do autor:",
                    response.data
                );
            }
        }

        loadBooks();
    }, [id]);

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <BackButton />

            <View className="items-center mt-4">
                <H1>Livros do autor</H1>
            </View>

            <BookList
                books={books}
                onRead={(book) => console.log("Ler livro:", book)}
                onViewMore={(book) =>
                    console.log("Ver mais do livro:", book)
                }
            />
        </SafeAreaView>
    );
}
