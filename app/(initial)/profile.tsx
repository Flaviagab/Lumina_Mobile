import { EditPhotoButton } from "@/components/EditPhotoButton";
import { IconButton } from "@/components/IconButton";
import { InfoRow } from "@/components/InfoRow";
import { ProfilePicture } from "@/components/ProfilePicture";
import { H1 } from "@/components/Text";
import { ThemeButton } from "@/components/ThemeButton";
import { useAuth } from "@/contexts/auth/AuthContext";
import { getProfile, updateUser } from "@/services/users";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Usuario = {
    id_usuario: number;
    nome: string;
    email: string;
    foto_perfil: string | null;
};

export default function Profile() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        async function carregarPerfil() {
            const response = await getProfile();

            if (!response.ok) {
                Alert.alert(
                    "Erro",
                    response.data?.mensagem ?? "Não foi possível carregar o perfil."
                );
                return;
            }

            setUsuario(response.data);
            setLoading(false);
        }

        carregarPerfil();
    }, []);

    const selectUserPhoto = async () => {
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

    if (result.canceled || !usuario) return;

    const uri = result.assets[0].uri;
    const fileName = uri.split("/").pop() ?? "foto.jpg";
    const extension = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
    const type = extension === "jpg" ? "image/jpeg" : `image/${extension}`;

    const formData = new FormData();
    formData.append("foto_perfil", { uri, name: fileName, type } as any);

    const response = await updateUser(usuario.id_usuario, formData);

    if (!response.ok) {
        console.log("Erro update foto:", JSON.stringify(response.data, null, 2));
    Alert.alert("Erro", response.data?.mensagem ?? "Não foi possível salvar a foto.");
    return; 
    }

    setUsuario((prev) => (prev ? { ...prev, foto_perfil: response.data.foto_perfil } : prev));
};

    const sair = async () => {
        await logout();
        router.replace("/");
    };

    const excluir = () => {
        Alert.alert(
            "Excluir conta",
            "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir", style: "destructive", onPress: async () => {
                        await logout();
                        router.replace("/");
                    },
                },
            ]
        );
    };

    if (loading || !usuario) {
        return (
            <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg items-center justify-center">
                <ActivityIndicator />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg items-center justify-center px-6 gap-4">
            <View className="absolute top-16 right-9">
                <ThemeButton />
            </View>

            <View className="relative">
                <ProfilePicture fotoUrl={usuario.foto_perfil} />

                <EditPhotoButton onPress={selectUserPhoto} />
            </View>

            <H1>{usuario.nome}</H1>

            <View className="w-full gap-3">
                <InfoRow label="Nome" value={usuario.nome} />
                <InfoRow label="Email" value={usuario.email} />
            </View>

            <View className="w-full gap-1 mt-2">
                <IconButton
                    icon="edit-2"
                    onPress={() => router.push("/")}
                >
                    Editar perfil
                </IconButton>

                <IconButton icon="log-out" onPress={sair}>
                    Deslogar
                </IconButton>

                <IconButton
                    icon="trash-2"
                    variant="danger"
                    onPress={excluir}
                >
                    Excluir minha conta
                </IconButton>
            </View>
        </SafeAreaView>
    );
}
