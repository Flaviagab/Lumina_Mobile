import { EditPhotoButton } from "@/components/EditPhotoButton";
import { IconButton } from "@/components/IconButton";
import { InfoRow } from "@/components/InfoRow";
import { ProfilePicture } from "@/components/ProfilePicture";
import { H1 } from "@/components/Text";
import { ThemeButton } from "@/components/ThemeButton";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Usuario = {
    id: string;
    nome: string;
    email: string;
    fotoURL: string;
};

const USUARIO_MOCK: Usuario = {
    id: "1",
    nome: "Ana Júlia",
    email: "ana.julia@email.com",
    fotoURL: "https://i.pinimg.com/736x/51/68/0f/51680f80d426669e16c3c9e2580bc584.jpg",
};

export default function Profile() {
    const [usuario, setUsuario] = useState<Usuario>(USUARIO_MOCK);
    const router = useRouter();

    const selectUserPhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Erro", "Preciso de permissão para acessar a galeria...");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;

        setUsuario((prev) => ({ ...prev, fotoURL: result.assets![0].uri }));
    };

    const sair = () => {
        router.replace("/");
    };

    const excluir = () => {
        Alert.alert(
            "Excluir conta",
            "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {

                        router.replace("/");
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg items-center justify-center px-6 gap-4">
            <View className="absolute top-16 right-9">
                <ThemeButton />
            </View>

            <View className="relative">
                <ProfilePicture fotoUrl={usuario.fotoURL} />
                <EditPhotoButton onPress={selectUserPhoto} />
            </View>

            <H1>{usuario.nome}</H1>

            <View className="w-full gap-3">
                <InfoRow label="Nome" value={usuario.nome} />
                <InfoRow label="Email" value={usuario.email} />
            </View>

            <View className="w-full gap-1 mt-2">
                <IconButton icon="edit-2" onPress={() => router.push("/")}>
                    Editar perfil
                </IconButton>

                <IconButton icon="log-out" onPress={sair}>
                    Deslogar
                </IconButton>

                <IconButton icon="trash-2" variant="danger" onPress={excluir}>
                    Excluir minha conta
                </IconButton>
            </View>
        </SafeAreaView>
    );
}