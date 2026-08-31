import { api } from "./api";
import { handleError, handleResponse } from "./response";

export async function getPublishers() {
    try {
        const response = await api.get("/editoras");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function createPublisher(data: unknown) {
    try {
        const response = await api.post("/editoras", data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updatePublisher(id: number, data: unknown) {
    try {
        const response = await api.put("/editoras/" + id, data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function deletePublisher(id: number) {
    try {
        const response = await api.delete("/editoras/" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}