import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { deleteBook, getBookCoverUrl, getBooks } from "@/services/books";
import { Book } from "@/types/book";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookList() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadBooks() {
        setLoading(true);
        const response = await getBooks();

        if (response.ok) {
            setBooks(response.data);
        } else {
            Alert.alert("Erro", "Não foi possível carregar os livros");
        }

        setLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadBooks();
        }, [])
    );

    function confirmDelete(id: number) {
        Alert.alert(
            "Excluir livro",
            "Tem certeza que deseja excluir este livro?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => handleDelete(id) },
            ]
        );
    }

    async function handleDelete(id: number) {
        const response = await deleteBook(id);

        if (response.ok) {
            Alert.alert("Sucesso", "Livro removido com sucesso!");
            loadBooks();
        } else {
            Alert.alert("Erro", "Erro interno do servidor");
        }
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-bodyBg dark:bg-dark-bodyBg">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <BackButton />

            <View className="flex-1 px-5 pt-5">
                <View className="items-center">
                    <PageHeader title="Livros" />
                </View>

                <View className="items-end mb-6">
                    <Button onPress={() => router.push("/(admin)/books/form")}>
                        Cadastrar
                    </Button>
                </View>

                <FlatList
                    data={books}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 14, paddingBottom: 24 }}
                    renderItem={({ item }) => (
                        <View className="flex-row bg-cardBg dark:bg-dark-cardBg rounded-2xl border border-textPrimary/15 dark:border-dark-textPrimary/15 p-5">
                            <Image
                                source={{ uri: getBookCoverUrl(item.coverImage) }}
                                className="w-16 h-24 rounded-lg mr-4"
                                resizeMode="cover"
                            />

                            <View className="flex-1">
                                <Text className="text-xl font-semibold text-textPrimary dark:text-dark-textPrimary">
                                    {item.title}
                                </Text>

                                <Text className="text-base text-textPrimary/70 dark:text-dark-textPrimary/70 mt-1">
                                    {item.author?.nome}
                                </Text>

                                <Text className="text-base font-semibold text-textPrimary dark:text-dark-textPrimary mt-2">
                                    R$ {item.price.toFixed(2)}
                                </Text>

                                <View className="flex-row items-center mt-4 pt-3 border-t border-textPrimary/10 dark:border-dark-textPrimary/10">
                                    <Button
                                        variant="outline"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/(admin)/books/form",
                                                params: { id: String(item.id) },
                                            })
                                        }
                                    >
                                        Editar
                                    </Button>

                                    <Text
                                        className="text-base font-medium text-danger dark:text-dark-danger ml-5"
                                        onPress={() => confirmDelete(item.id)}
                                    >
                                        Excluir
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View className="items-center py-16 px-5">
                            <Text className="text-lg font-medium text-textPrimary/50 dark:text-dark-textPrimary/50 text-center">
                                Nenhum livro cadastrado
                            </Text>
                            <Text className="text-base text-textPrimary/40 dark:text-dark-textPrimary/40 mt-2 text-center">
                                Cadastre um livro para começar.
                            </Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}