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
        return {
            ok: false,
            status: error.response?.status ?? 0,
            data: error.response?.data ?? {
                message: "Erro inesperado",
            },
        };
    }

    return {
        ok: false,
        status: 0,
        data: {
            message: "Erro inesperado",
        },
    };
}