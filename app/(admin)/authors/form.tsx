import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { FormCard } from "@/components/FormCard";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { createAuthor, getAuthorById, updateAuthor } from "@/services/authors";
import { AuthorInput } from "@/types/author";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthorForm() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = !!id;

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState<{ uri: string; name: string; type: string }>();

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEditing) return;

        async function loadAuthor() {
            const response = await getAuthorById(Number(id));

            if (response.ok) {
                setName(response.data.name);
                setBio(response.data.bio);
            } else {
                Alert.alert("Erro", "Não foi possível carregar o autor");
                router.back();
            }

            setLoading(false);
        }

        loadAuthor();
    }, [id]);

    async function pickPhoto() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Erro", "É necessário permissão para acessar a galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;

        const uri = result.assets[0].uri;
        const fileName = uri.split("/").pop() ?? "foto.jpg";
        const extension = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
        const type = extension === "jpg" ? "image/jpeg" : `image/${extension}`;

        setPhoto({ uri, name: fileName, type });
    }

    async function handleSubmit() {
        if (!name || !bio) {
            Alert.alert("Atenção", "Nome e biografia são obrigatórios");
            return;
        }

        if (!isEditing && !photo) {
            Alert.alert("Atenção", "Selecione uma foto do autor");
            return;
        }

        const data: AuthorInput = { name, bio, photo };
        setSaving(true);

        const response = isEditing
            ? await updateAuthor(Number(id), data)
            : await createAuthor(data);

        setSaving(false);

        if (response.ok) {
            Alert.alert(
                "Sucesso",
                isEditing ? "Autor atualizado com sucesso!" : "Autor criado com sucesso!"
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
                    <PageHeader title={isEditing ? "Editar autor" : "Cadastrar autor"} />

                    <FormCard>
                        <View className="items-center mb-4">
                            {photo ? (
                                <Image source={{ uri: photo.uri }} className="w-24 h-24 rounded-lg mb-2" />
                            ) : null}
                            <Button variant="outline" className="w-52 rounded-lg" onPress={pickPhoto}>
                                {photo ? "Trocar foto" : "Selecionar foto"}
                            </Button>
                        </View>

                        <Input
                            label="Nome"
                            value={name}
                            onChangeText={setName}
                            placeholder="Digite o nome do autor"
                        />

                        <Input
                            label="Biografia"
                            value={bio}
                            onChangeText={setBio}
                            placeholder="Digite a biografia"
                            multiline
                            numberOfLines={4}
                            style={{ textAlignVertical: "top" }}
                            className="h-56 pt-3"
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