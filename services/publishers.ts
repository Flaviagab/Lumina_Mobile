import { Publisher, PublisherInput } from "@/types/publisher";
import { api } from "./api";
import { handleError, handleResponse } from "./response";

export function mapPublisher(publisher: any): Publisher {
    return {
        id: publisher.id_editora,
        name: publisher.nome,
        description: publisher.descricao,
    };
}

function mapPublisherInput(data: PublisherInput) {
    return {
        nome: data.name,
        descricao: data.description,
    };
}

export async function getPublishers() {
    try {
        const response = await api.get("/editoras");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapPublisher);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getPublisherById(id: number) {
    try {
        const response = await api.get("/editoras/" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = mapPublisher(result.data);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function createPublisher(data: PublisherInput) {
    try {
        const response = await api.post("/editoras", mapPublisherInput(data));
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updatePublisher(id: number, data: PublisherInput) {
    try {
        const response = await api.put("/editoras/" + id, mapPublisherInput(data));
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