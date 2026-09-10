import { Author, AuthorInput } from "@/types/author";
import { api } from "./api";
import { handleError, handleResponse } from "./response";

export function mapAuthor(author: any): Author {
    return {
        id: author.id_autor,
        name: author.nome,
        bio: author.biografia,
        photo: author.foto,
    };
}

function buildAuthorFormData(data: AuthorInput) {
    const formData = new FormData();

    formData.append("nome", data.name);
    formData.append("biografia", data.bio);

    if (data.photo) {
        formData.append("foto", data.photo as any);
    }

    return formData;
}

export async function getAuthors() {
    try {
        const response = await api.get("/autores");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapAuthor);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getAuthorById(id: number) {
    try {
        const response = await api.get("/autores/" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = mapAuthor(result.data);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function createAuthor(data: AuthorInput) {
    try {
        const response = await api.post("/autores", buildAuthorFormData(data), {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateAuthor(id: number, data: AuthorInput) {
    try {
        const response = await api.put("/autores/" + id, buildAuthorFormData(data), {
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

export function getAuthorPhotoUrl(filename: string) {
    return `http://10.0.2.2:3000/uploads/${filename}`;
}