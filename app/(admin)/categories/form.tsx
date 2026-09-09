import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { FormCard } from "@/components/FormCard";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import {
    createCategory,
    getCategoryById,
    updateCategory,
} from "@/services/categories";
import { CategoryInput } from "@/types/category";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Switch,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryForm() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = !!id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState(false);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEditing) return;

        async function loadCategory() {
            const response = await getCategoryById(Number(id));

            if (response.ok) {
                setName(response.data.name);
                setDescription(response.data.description);
                setFeatured(response.data.featured);
            } else {
                Alert.alert(
                    "Erro",
                    "Não foi possível carregar a categoria"
                );
                router.back();
            }

            setLoading(false);
        }

        loadCategory();
    }, [id]);

    async function handleSubmit() {
        if (!name || !description) {
            Alert.alert(
                "Atenção",
                "Nome e descrição são obrigatórios"
            );
            return;
        }

        const data: CategoryInput = {
            name,
            description,
            featured,
        };

        setSaving(true);

        const response = isEditing
            ? await updateCategory(Number(id), data)
            : await createCategory(data);

        setSaving(false);

        if (response.ok) {
            Alert.alert(
                "Sucesso",
                isEditing
                    ? "Categoria atualizada com sucesso!"
                    : "Categoria criada com sucesso!"
            );

            router.back();
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
                <PageHeader
                    title={
                        isEditing
                            ? "Editar categoria"
                            : "Cadastrar categoria"
                    }
                />

                <FormCard>
                    <Input
                        label="Nome"
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite o nome da categoria"
                    />

                    <Input
                        label="Descrição"
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Digite a descrição"
                        multiline
                        numberOfLines={4}
                        style={{ textAlignVertical: "top" }}
                        className="h-[210px] pt-3"
                    />

                    <View className="flex-row items-center justify-between mt-2">
                        <View className="flex-1 mr-4">
                            <Text className="text-lg font-semibold text-[#3D3B6B] dark:text-[#E5E4FA]">
                                Destaque
                            </Text>

                            <Text className="text-sm text-textPrimary/55 dark:text-dark-textPrimary/55 mt-1">
                                Exibir esta categoria como destaque
                            </Text>
                        </View>

                        <Switch
                            value={featured}
                            onValueChange={setFeatured}
                        />
                    </View>
                </FormCard>
                <View className="items-center">
                    <Button
                        className="w-full gap-1 mt-2 mb-4 items-center"
                        onPress={handleSubmit}>
                        Salvar
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}