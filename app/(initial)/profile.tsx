import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { InfoRow } from "@/components/InfoRow";
import { ProfilePicture } from "@/components/ProfilePicture";
import { H1 } from "@/components/Text";
import { ThemeButton } from "@/components/ThemeButton";
import { useAuth } from "@/contexts/auth/AuthContext";
import { deleteUser, getProfile } from "@/services/users";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
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
    const { user } = useAuth();

    const router = useRouter();
    const { logout } = useAuth();

    useFocusEffect(
        useCallback(() => {
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
        }, [])
    );

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
                        const response = await deleteUser(usuario!.id_usuario);

                        if (!response.ok) {
                            Alert.alert(
                                "Erro",
                                response.data?.mensagem ?? "Não foi possível excluir sua conta."
                            );
                            return;
                        }


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
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg items-center justify-center px-3 gap-4">
            <H1 className="text-center m-2">Perfil</H1>
            <View className="absolute top-28 right-9">
                <ThemeButton />
            </View>

            <View className="relative">
                <ProfilePicture fotoUrl={usuario.foto_perfil} />
            </View>

            <H1>{usuario.nome}</H1>

            <View className="w-full gap-3 ml-9 my-5">
                <InfoRow label="Email" value={usuario.email} />
            </View>

            <View className="w-full gap-1 my-4 items-center">
                {user?.role === "admin" && (
                    <Button
                        variant="filled"
                        className="w-64"
                        onPress={() => router.push("/(admin)")}
                    >
                        Painel do Administrador
                    </Button>
                )}

                <View className="flex-row gap-4 mt-6">
                    <IconButton
                        icon="edit-2"
                        className="rounded-xl h-16 w-40  justify-center"
                        onPress={() => router.push("/editProfile")}>
                        Editar perfil
                    </IconButton>

                    <IconButton
                        icon="log-out"
                        className="rounded-xl h-16 w-40 justify-center"
                        onPress={sair}>
                        Deslogar
                    </IconButton>
                </View>
                <View className="mt-14 items-center">
                    <IconButton
                        icon="trash-2"
                        variant="danger"
                        onPress={excluir}
                    >
                        Excluir minha conta
                    </IconButton>
                </View>
            </View>
        </SafeAreaView>
    );
}