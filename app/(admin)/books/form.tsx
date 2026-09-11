import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { FormCard } from "@/components/FormCard";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { Select } from "@/components/Select";
import { useTheme } from "@/contexts/theme/themeContext";
import { getAuthors } from "@/services/authors";
import { createBook, getBookById, updateBook } from "@/services/books";
import { getCategories } from "@/services/categories";
import { getCollections } from "@/services/collections";
import { getPublishers } from "@/services/publishers";
import { Author } from "@/types/author";
import { BookInput } from "@/types/book";
import { Category } from "@/types/category";
import { Collection } from "@/types/collection";
import { Publisher } from "@/types/publisher";
import { formatPrice } from "@/utils/masks";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookForm() {
    const router = useRouter();
    const { theme } = useTheme();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const isEditing = !!id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priceDigits, setPriceDigits] = useState("");
    const [featured, setFeatured] = useState(false);
    const [categoryId, setCategoryId] = useState<number>();
    const [authorId, setAuthorId] = useState<number>();
    const [publisherId, setPublisherId] = useState<number>();
    const [collectionId, setCollectionId] = useState<number>();

    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);

    const [coverImage, setCoverImage] = useState<{ uri: string; name: string; type: string }>();
    const [pdfFile, setPdfFile] = useState<{ uri: string; name: string; type: string }>();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function loadData() {
            const [categoriesResponse, authorsResponse, publishersResponse, collectionsResponse] = await Promise.all([
                getCategories(),
                getAuthors(),
                getPublishers(),
                getCollections(),
            ]);

            if (categoriesResponse.ok) setCategories(categoriesResponse.data);
            if (authorsResponse.ok) setAuthors(authorsResponse.data);
            if (publishersResponse.ok) setPublishers(publishersResponse.data);
            if (collectionsResponse.ok) setCollections(collectionsResponse.data);

            if (isEditing) {
                const response = await getBookById(Number(id));

                if (response.ok) {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setPriceDigits(String(Math.round(response.data.price * 100)));
                    setFeatured(response.data.featured);
                    setCategoryId(response.data.categoryId);
                    setAuthorId(response.data.authorId);
                    setPublisherId(response.data.publisherId);
                    setCollectionId(response.data.collection?.id);
                } else {
                    Alert.alert("Erro", "Não foi possível carregar o livro");
                    router.back();
                    return;
                }
            }

            setLoading(false);
        }

        loadData();
    }, [id]);

    function handlePriceChange(text: string) {
        const digits = text.replace(/\D/g, "");
        setPriceDigits(digits);
    }

    async function pickCoverImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Erro", "É necessário permissão para acessar a galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (result.canceled) return;

        const uri = result.assets[0].uri;
        const fileName = uri.split("/").pop() ?? "capa.jpg";
        const extension = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
        const type = extension === "jpg" ? "image/jpeg" : `image/${extension}`;

        setCoverImage({ uri, name: fileName, type });
    }

    async function pickPdfFile() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            setPdfFile({
                uri: asset.uri,
                name: asset.name,
                type: asset.mimeType ?? "application/pdf",
            });
        }
    }

    async function handleSubmit() {
        if (!title || !description || !priceDigits || !categoryId || !authorId || !publisherId) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios");
            return;
        }

        if (!isEditing && (!coverImage || !pdfFile)) {
            Alert.alert("Atenção", "Selecione a capa e o PDF do livro");
            return;
        }

        const data: BookInput = {
            title,
            description,
            price: Number(priceDigits) / 100,
            categoryId,
            authorId,
            publisherId,
            collectionId: collectionId ?? null,
            featured,
            coverImage,
            pdfFile,
        };

        setSaving(true);

        const response = isEditing
            ? await updateBook(Number(id), data)
            : await createBook(data);

        setSaving(false);

        if (response.ok) {
            Alert.alert(
                "Sucesso",
                isEditing ? "Livro atualizado com sucesso!" : "Livro criado com sucesso!"
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
                    <PageHeader title={isEditing ? "Editar livro" : "Cadastrar livro"} />

                    <FormCard>
                        <Input
                            label="Título"
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Digite o título do livro"
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

                        <Input
                            label="Preço"
                            value={formatPrice(priceDigits)}
                            onChangeText={handlePriceChange}
                            placeholder="R$ 0,00"
                            keyboardType="numeric"
                        />
                        <Select
                            label="Categoria"
                            value={categoryId}
                            options={categories.map((category) => ({ label: category.name, value: category.id }))}
                            onChange={setCategoryId}
                        />


                        <Select
                            label="Autor"
                            value={authorId}
                            options={authors.map((author) => ({ label: author.name, value: author.id }))}
                            onChange={setAuthorId}
                        />

                        <Select
                            label="Editora"
                            value={publisherId}
                            options={publishers.map((publisher) => ({ label: publisher.name, value: publisher.id }))}
                            onChange={setPublisherId}
                        />

                        <Select
                            label="Coleção"
                            value={collectionId}
                            options={[
                                { label: "Nenhuma", value: 0 },
                                ...collections.map((collection) => ({ label: collection.name, value: collection.id })),
                            ]}
                            onChange={(value) => setCollectionId(value === 0 ? undefined : value)}
                        />

                        <View className="mb-4">
                            <Text className="text-base font-semibold text-[#3D3B6B] dark:text-[#E5E4FA] mb-2 ml-2">
                                Capa
                            </Text>
                            {coverImage ? (
                                <Image source={{ uri: coverImage.uri }} className="w-24 h-32 rounded-lg mb-2" />
                            ) : null}
                            <Button variant="outline" className="w-52 rounded-lg" onPress={pickCoverImage}>
                                {coverImage ? "Trocar imagem" : "Selecionar imagem"}
                            </Button>
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold text-[#3D3B6B] dark:text-[#E5E4FA] mb-2 ml-2">
                                Arquivo PDF
                            </Text>
                            <Button variant="outline" className="w-52 rounded-lg" onPress={pickPdfFile}>
                                {pdfFile ? pdfFile.name : "Selecionar PDF"}
                            </Button>
                        </View>

                        <View className="flex-row items-center justify-between mt-2">
                            <View className="flex-1 mr-4">
                                <Text className="text-lg font-semibold text-[#3D3B6B] dark:text-[#E5E4FA]">
                                    Destaque
                                </Text>
                                <Text className="text-sm text-textPrimary/55 dark:text-dark-textPrimary/55 mt-1">
                                    Exibir este livro como destaque
                                </Text>
                            </View>
                            <Switch value={featured} onValueChange={setFeatured} />
                        </View>
                    </FormCard>

                    <View className="items-center mb-32">
                        <Button className="w-full gap-1 mt-2 items-center" onPress={handleSubmit}>
                            Salvar
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}