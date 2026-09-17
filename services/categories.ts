import { Category, CategoryInput } from "@/types/category";
import { api } from "./api";
import { handleError, handleResponse } from "./response";

export function mapCategory(category: any): Category {
    return {
        id: category.id_categoria,
        name: category.nome,
        description: category.descricao,
        featured: category.destaque === 1 || category.destaque === true,
    };
}

function mapCategoryInput(data: CategoryInput) {
    return {
        nome: data.name,
        descricao: data.description,
        destaque: data.featured,
    };
}

export async function getCategories() {
    try {
        const response = await api.get("/categorias");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapCategory);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getFeaturedCategories() {
    try {
        const response = await api.get("/categorias/destaque");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapCategory);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getCategoryById(id: number) {
    try {
        const response = await api.get("/categorias/" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = mapCategory(result.data);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function createCategory(data: CategoryInput) {
    try {
        const response = await api.post("/categorias", mapCategoryInput(data));
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateCategory(id: number, data: CategoryInput) {
    try {
        const response = await api.put("/categorias/" + id, mapCategoryInput(data));
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