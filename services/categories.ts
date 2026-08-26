import { api } from "./api";
import { handleError, handleResponse } from "./response";

export async function getCategories() {
    try {
        const response = await api.get("/categorias");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map((cat: any) => ({
                id: cat.id_categoria,
                name: cat.nome,
            }));
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getFeaturedCategories() {
    try {
        const response = await api.get("/categorias/destaque");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function createCategory(data: unknown) {
    try {
        const response = await api.post("/categorias", data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateCategory(id: number, data: unknown) {
    try {
        const response = await api.put("/categorias/" + id, data);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteCategory(id: number) {
    try {
        const response = await api.delete("/categorias/" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}