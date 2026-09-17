import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { FormCard } from "@/components/FormCard";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { createPublisher, getPublisherById, updatePublisher } from "@/services/publishers";
import { PublisherInput } from "@/types/publisher";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PublisherForm() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = !!id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEditing) return;

        async function loadPublisher() {
            const response = await getPublisherById(Number(id));

            if (response.ok) {
                setName(response.data.name);
                setDescription(response.data.description);
            } else {
                Alert.alert("Erro", "Não foi possível carregar a editora");
                router.back();
            }

            setLoading(false);
        }

        loadPublisher();
    }, [id]);

    async function handleSubmit() {
        if (!name || !description) {
            Alert.alert("Atenção", "Nome e descrição são obrigatórios");
            return;
        }

        const data: PublisherInput = { name, description };
        setSaving(true);

        const response = isEditing
            ? await updatePublisher(Number(id), data)
            : await createPublisher(data);

        setSaving(false);

        if (response.ok) {
            Alert.alert(
                "Sucesso",
                isEditing ? "Editora atualizada com sucesso!" : "Editora criada com sucesso!"
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

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
                <ScrollView
                    className="flex-1 px-5 pt-20"
                    contentContainerStyle={{ paddingBottom: 40 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <PageHeader title={isEditing ? "Editar editora" : "Cadastrar editora"} />

                    <FormCard>
                        <Input
                            label="Nome"
                            value={name}
                            onChangeText={setName}
                            placeholder="Digite o nome da editora"
                        />

                        <Input
                            label="Descrição"
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Digite a descrição"
                            multiline
                            numberOfLines={4}
                            style={{ textAlignVertical: "top" }}
                            className="h-36 pt-3"
                        />
                    </FormCard>

                    <View className="items-center mb-32">
                        <Button
                            className="w-full gap-1 mt-2 items-center"
                            onPress={handleSubmit}>
                            Salvar
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}