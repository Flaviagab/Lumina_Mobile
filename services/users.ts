import { api } from "./api";
import { handleError, handleResponse } from "./response";

export async function getUsers() {
    try {
        const response = await api.get("/usuarios");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function createUser(data: FormData) {
    try {
        const response = await api.post("/usuarios", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function loginUser(data: { email: string; senha: string }) {
    try {
        const response = await api.post("/entrar", data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateUser(id: number, data: FormData) {
    try {
        const response = await api.put("/usuarios/" + id, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteUser(id: number) {
    try {
        const response = await api.delete("/usuarios/" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function getProfile() {
    try {
        const response = await api.get("/perfil");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}