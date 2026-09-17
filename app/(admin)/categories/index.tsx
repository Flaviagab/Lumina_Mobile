import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { deleteCategory, getCategories } from "@/services/categories";
import { Category } from "@/types/category";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryList() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadCategories() {
        setLoading(true);
        const response = await getCategories();

        if (response.ok) {
            setCategories(response.data);
        } else {
            Alert.alert("Erro", "Não foi possível carregar as categorias");
        }

        setLoading(false);
    }

    useFocusEffect(
        useCallback(() => {
            loadCategories();
        }, [])
    );

    function confirmDelete(id: number) {
        Alert.alert(
            "Excluir categoria",
            "Tem certeza que deseja excluir esta categoria?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => handleDelete(id),
                },
            ]
        );
    }

    async function handleDelete(id: number) {
        const response = await deleteCategory(id);

        if (response.ok) {
            Alert.alert("Sucesso", "Categoria removida com sucesso!");
            loadCategories();
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
                    <PageHeader
                        title="Categorias"
                    />
                </View>

                <View className="items-end mb-6">
                    <Button
                        onPress={() =>
                            router.push("/(admin)/categories/form")
                        }>
                        Cadastrar
                    </Button>
                </View>

                <FlatList
                    data={categories}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 14,
                        paddingBottom: 24,
                    }}
                    renderItem={({ item }) => (
                        <View className="bg-cardBg dark:bg-dark-cardBg rounded-2xl border border-textPrimary/15 dark:border-dark-textPrimary/15 p-5">
                            <Text className="text-xl font-semibold text-textPrimary dark:text-dark-textPrimary">
                                {item.name}
                            </Text>

                            <Text className="text-base text-textPrimary/70 dark:text-dark-textPrimary/70 mt-2 leading-6">
                                {item.description}
                            </Text>

                            <View className="mt-4">
                                <Text className="text-sm font-medium text-textPrimary/50 dark:text-dark-textPrimary/50">
                                    Destaque
                                </Text>

                                <Text className="text-base font-semibold text-textPrimary dark:text-dark-textPrimary mt-1">
                                    {item.featured ? "Sim" : "Não"}
                                </Text>
                            </View>

                            <View className="flex-row items-center mt-5 pt-4 border-t border-textPrimary/10 dark:border-dark-textPrimary/10">
                                <Button
                                    variant="outline"
                                    onPress={() =>
                                        router.push({
                                            pathname:
                                                "/(admin)/categories/form",
                                            params: {
                                                id: String(item.id),
                                            },
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
                    )}
                    ListEmptyComponent={
                        <View className="items-center py-16 px-5">
                            <Text className="text-lg font-medium text-textPrimary/50 dark:text-dark-textPrimary/50 text-center">
                                Nenhuma categoria cadastrada
                            </Text>

                            <Text className="text-base text-textPrimary/40 dark:text-dark-textPrimary/40 mt-2 text-center">
                                Cadastre uma categoria para começar.
                            </Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}
