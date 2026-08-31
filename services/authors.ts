import { api } from "./api";
import { handleError, handleResponse } from "./response";

export async function getAuthors() {
    try {
        const response = await api.get("/autores");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function createAuthor(data: FormData) {
    try {
        const response = await api.post("/autores", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateAuthor(id: number, data: FormData) {
    try {
        const response = await api.put("/autores/" + id, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteAuthor(id: number) {
    try {
        const response = await api.delete("/autores/" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}