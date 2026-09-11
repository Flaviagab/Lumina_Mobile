import { Collection, CollectionInput } from "@/types/collection";
import { api } from "./api";
import { handleError, handleResponse } from "./response";

export function mapCollection(collection: any): Collection {
    return {
        id: collection.id_colecao,
        name: collection.nome,
        description: collection.descricao,
    };
}

function mapCollectionInput(data: CollectionInput) {
    return {
        nome: data.name,
        descricao: data.description,
    };
}

export async function getCollections() {
    try {
        const response = await api.get("/colecoes");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapCollection);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getCollectionById(id: number) {
    try {
        const response = await api.get("/colecoes/" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = mapCollection(result.data);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function createCollection(data: CollectionInput) {
    try {
        const response = await api.post("/colecoes", mapCollectionInput(data));
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateCollection(id: number, data: CollectionInput) {
    try {
        const response = await api.put("/colecoes/" + id, mapCollectionInput(data));
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