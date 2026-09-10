import { Button } from "@/components/Button";
import { EditPhotoButton } from "@/components/EditPhotoButton";
import { Input } from "@/components/Input";
import { InputSenha } from "@/components/InputSenha";
import { ProfilePicture } from "@/components/ProfilePicture";
import { createUser } from "@/services/users";
import { formatCpf } from "@/utils/masks";
import { hasSpecialCharacter, hasUppercase, isValidCpf, isValidEmail } from "@/utils/validators";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

type RegisterForm = {
    name: string;
    cpf: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const router = useRouter();

    const [profileImage, setProfileImage] =
        useState<ImagePicker.ImagePickerAsset | null>(null);

    const { control, handleSubmit, watch, setError, reset, formState: { errors } } = useForm<RegisterForm>({
        defaultValues: {
            name: "",
            cpf: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onBlur",
    });

    const senha = watch("password");

    async function handlePickImage() {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permissão necessária",
                "Precisamos de acesso à galeria para escolher sua foto."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0]);
        }
    }

    async function handleRegister(data: RegisterForm) {
        const formData = new FormData();

        formData.append("nome", data.name);
        formData.append("cpf", data.cpf.replace(/\D/g, ""));
        formData.append("email", data.email);
        formData.append("senha", data.password);
        formData.append("confirmarSenha", data.confirmPassword);

        if (profileImage) {
            const fileName =
                profileImage.uri.split("/").pop() ?? "profile.jpg";

            const extension =
                fileName.split(".").pop()?.toLowerCase() ?? "jpg";

            const type =
                extension === "jpg"
                    ? "image/jpeg"
                    : "image/" + extension;

            formData.append("foto_perfil", {
                uri: profileImage.uri,
                name: fileName,
                type,
            } as any);
        }

        const response = await createUser(formData);

        if (!response.ok) {
            if (response.data?.erros) {
                response.data.erros.forEach(
                    (error: {
                        path: keyof RegisterForm;
                        msg: string;
                    }) => {
                        setError(error.path, {
                            type: "server",
                            message: error.msg,
                        });
                    }
                );
            } else {
                Alert.alert(
                    "Erro",
                    response.data?.mensagem ??
                    "Não foi possível realizar o cadastro."
                );
            }

            return;
        }

        Alert.alert(
            "Sucesso",
            "Cadastro realizado com sucesso!",
            [
                {
                    text: "OK",
                    onPress: () => {
                        reset();
                        setProfileImage(null);
                        router.push("/login");
                    },
                },
            ]
        );
    }

    return (
        <KeyboardAvoidingView className="flex-1"
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
        <ScrollView
            className="flex-1 bg-bodyBg dark:bg-dark-bodyBg"
            contentContainerClassName="px-6 py-10 items-center"
        >
            <Text className="text-2xl font-bold text-[#3D3B6B] dark:text-[#E5E4FA] mb-6">
                Faça seu Cadastro
            </Text>

            <View className="relative mb-6">
                <ProfilePicture fotoUrl={profileImage?.uri} />

                <EditPhotoButton onPress={handlePickImage} />
            </View>

            <Controller
                control={control}
                name="name"
                rules={{
                    required: "O nome é obrigatório",
                    minLength: {
                        value: 3,
                        message: "Mínimo 3 caracteres",
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Nome"
                        placeholder="Digite seu nome"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.name?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="cpf"
                rules={{
                    required: "O CPF é obrigatório",
                    validate: (value) =>
                        isValidCpf(value) || "CPF inválido",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="CPF"
                        placeholder="Digite seu CPF"
                        value={value}
                        onChangeText={(text) => onChange(formatCpf(text))}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        error={errors.cpf?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="email"
                rules={{
                    required: "O email é obrigatório",
                    validate: (value) =>
                        isValidEmail(value) || "Email inválido",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        label="Email"
                        placeholder="Digite seu email"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        error={errors.email?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{
                    required: "A senha é obrigatória", minLength: {
                        value: 6, message: "Mínimo 6 caracteres",
                    },
                    validate: {
                        uppercase: (value) =>
                            hasUppercase(value) ||
                            "Deve ter pelo menos 1 letra maiúscula",

                        specialCharacter: (value) =>
                            hasSpecialCharacter(value) ||
                            "Deve ter pelo menos 1 caractere especial",
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputSenha
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.password?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="confirmPassword"
                rules={{
                    required: "Confirme sua senha",
                    validate: (value) =>
                        value === senha || "As senhas não são iguais!",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputSenha
                        label="Confirmar Senha"
                        placeholder="Confirme sua senha"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.confirmPassword?.message}
                    />
                )}
            />

            <View className="flex-row gap-4 mt-4 items-center">
                <Button onPress={handleSubmit(handleRegister)}>
                    Cadastrar
                </Button>

                <Button variant="outline" onPress={() => router.push("/login")} >
                    Já tenho uma conta
                </Button>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}