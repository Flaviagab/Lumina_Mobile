import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { InputSenha } from "@/components/InputSenha";
import { useAuth } from "@/contexts/auth/AuthContext";
import { loginUser } from "@/services/users";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Atenção", "Preencha o email e a senha.");
            return;
        }

        setLoading(true);

        const response = await loginUser({
            email,
            senha: password,
        });

        setLoading(false);

        if (!response.ok) {
            Alert.alert(
                "Erro",
                response.data?.mensagem ?? "Email ou senha inválidos."
            );
            return;
        }

        await login(response.data.token);

        router.replace("/home");
    }

    return (
        <View className="flex-1 bg-bodyBg dark:bg-dark-bodyBg px-6 justify-center">

            <Text className="text-3xl font-bold text-[#3D3B6B] dark:text-[#E5E4FA] mb-2">
                Bem-vindo!
            </Text>

            <Text className="text-base text-[#7573A8] dark:text-[#9A98D1] mb-8">
                Entre na sua conta para continuar.
            </Text>

            <Input
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <InputSenha
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
            />

            <Button onPress={handleLogin}>
                Entrar
            </Button>

            <View className="flex-row justify-center items-center mt-2">
                <Text className="text-[#3D3B6B] dark:text-[#E5E4FA]">
                    Ainda não possui uma conta?
                </Text>

                <Button
                    variant="ghost"
                    className="w-auto h-auto border-0 mb-0 mt-3 ml-2"
                    onPress={() => router.push("/register")}
                >
                    Criar conta
                </Button>
            </View>

        </View>
    );
}