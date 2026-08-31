import { api } from "./api";
import { handleError, handleResponse } from "./response";

export async function getBooks() {
    try {
        const response = await api.get("/livros");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function getFeaturedBooks() {
    try {
        const response = await api.get("/livros/destaque");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function getBooksByAuthor(id: number) {
    try {
        const response = await api.get("/autores" + id + "/livros");
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function createBook(data: FormData) {
    try {
        const response = await api.post("/livros", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateBook(id: number, data: FormData){
    try {
        const response = await api.put("/livros" + id, data, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}


export async function deleteBook(id: number, data: FormData){
    try {
        const response = await api.delete("/livros" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error)
    }
}