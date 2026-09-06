import { Button } from "@/components/Button";
import { EditPhotoButton } from "@/components/EditPhotoButton";
import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/Input";
import { InputSenha } from "@/components/InputSenha";
import { ProfilePicture } from "@/components/ProfilePicture";
import { H1 } from "@/components/Text";
import { getProfile, updateUser } from "@/services/users";
import { formatCpf } from "@/utils/masks";
import { hasSpecialCharacter, hasUppercase, isValidCpf } from "@/utils/validators";
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

type FormErrors = {
    nome?: string;
    cpf?: string;
    senha?: string;
    confirmarSenha?: string;
};

export default function EditProfile() {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<FormErrors>({});

    const router = useRouter();

    useEffect(() => {
        async function carregarPerfil() {
            const response = await getProfile();

            if (!response.ok) {
                Alert.alert("Erro", response.data?.mensagem ?? "Não foi possível carregar o perfil.");
                return;
            }

            setUsuario(response.data);
            setNome(response.data.nome);
            setCpf(formatCpf(response.data.cpf));
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
            Alert.alert("Erro", response.data?.mensagem ?? "Não foi possível salvar a foto.");
            return;
        }

        setUsuario((prev) => (prev ? { ...prev, ...response.data } : prev));
    };

    const salvar = async () => {
        if (!usuario) return;

        const novosErros: FormErrors = {};

        if (!nome || nome.trim().length < 3) {
            novosErros.nome = "Mínimo 3 caracteres";
        }

        if (!isValidCpf(cpf)) {
            novosErros.cpf = "CPF inválido";
        }

        if (senha) {
            if (senha.length < 6) {
                novosErros.senha = "Mínimo 6 caracteres";
            } else if (!hasUppercase(senha)) {
                novosErros.senha = "Deve ter pelo menos 1 letra maiúscula";
            } else if (!hasSpecialCharacter(senha)) {
                novosErros.senha = "Deve ter pelo menos 1 caractere especial";
            }

            if (senha !== confirmarSenha) {
                novosErros.confirmarSenha = "As senhas não são iguais!";
            }
        }

        setErrors(novosErros);

        if (Object.keys(novosErros).length > 0) return;

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("cpf", cpf.replace(/\D/g, ""));
        if (senha) {
            formData.append("senha", senha);
        }

        const response = await updateUser(usuario.id_usuario, formData);

        if (!response.ok) {
            if (response.data?.erros) {
                const errosServidor: FormErrors = {};
                response.data.erros.forEach((error: { path: string; msg: string }) => {
                    errosServidor[error.path as keyof FormErrors] = error.msg;
                });
                setErrors(errosServidor);
            } else {
                Alert.alert("Erro", response.data?.mensagem ?? "Não foi possível atualizar o perfil.");
            }
            return;
        }

        router.back();
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
            <View className="absolute top-11 left-6 z-10">
                <IconButton icon="arrow-left" onPress={() => router.back()}> </IconButton>
            </View>

            <H1>Editar perfil</H1>

            <View className="relative items-center">
                <ProfilePicture fotoUrl={usuario.foto_perfil} />
                <EditPhotoButton onPress={selectUserPhoto} />
            </View>

            <View className="w-full gap-3 mt-4">
                <Input
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                    error={errors.nome}
                />
                <Input
                    label="CPF"
                    value={cpf}
                    onChangeText={(text) => setCpf(formatCpf(text))}
                    keyboardType="numeric"
                    error={errors.cpf}
                />
                <InputSenha
                    label="Nova senha"
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Deixe em branco para não alterar"
                    error={errors.senha}
                />
                <InputSenha
                    label="Confirmar nova senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder="Repita a nova senha"
                    error={errors.confirmarSenha}
                />
            </View>

            <Button variant="filled" onPress={salvar}>
                Salvar
            </Button>
        </SafeAreaView>
    );
}