import { BackButton } from "@/components/BackButton";
import { BookList } from "@/components/Books/BookList";
import { H1 } from "@/components/Text";
import { getBooksByCollection } from "@/services/books";
import type { Book } from "@/types/book";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CollectionBooks() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        async function loadBooks() {
            if (!id) return;

            const response = await getBooksByCollection(Number(id));

            if (response.ok) {
                setBooks(response.data);
            } else {
                console.log(
                    "Erro ao buscar livros da coleção:",
                    response.data
                );
            }
        }

        loadBooks();
    }, [id]);

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <BackButton />

            <View className="items-center mt-4 ml-10">
                <H1>Livros da coleção</H1>
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