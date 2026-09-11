import { AxiosResponse, isAxiosError } from "axios";

export function handleResponse(response: AxiosResponse) {
    return {
        ok: true,
        status: response.status,
        data: response.data,
    };
}

export function handleError(error: unknown) {
    if (isAxiosError(error)) {
        console.log("===== ERRO AXIOS ====="); console.log("Mensagem:", error.message); console.log("Status:", error.response?.status); console.log("Dados:", error.response?.data); console.log("URL:", error.config?.url); console.log("Método:", error.config?.method); console.log("Base URL:", error.config?.baseURL); console.log("Código:", error.code); console.log("======================");
        return {
            ok: false,
            status: error.response?.status ?? 0,
            data: error.response?.data ?? {
                message: "Erro inesperado",
            },
        };
    }
console.log("Erro:", error);
    return {
        ok: false,
        status: 0,
        data: {
            message: "Erro inesperado",
        },
    };
}