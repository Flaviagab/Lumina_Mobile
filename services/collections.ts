import { api } from "./api";
import { handleError, handleResponse } from "./response";

export async function getCollections() {
    try {
        const response = await api.get("/colecoes");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function createCollection(data: unknown) {
    try {
        const response = await api.post("/colecoes", data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateCollection(id: number, data: unknown) {
    try {
        const response = await api.put("/colecoes/" + id, data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteCollection(id: number) {
    try {
        const response = await api.delete("/colecoes/" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}