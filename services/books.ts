import { Book, BookInput } from "@/types/book";
import { api } from "./api";
import { mapAuthor } from "./authors";
import { mapCategory } from "./categories";
import { mapCollection } from "./collections";
import { mapPublisher } from "./publishers";
import { handleError, handleResponse } from "./response";

function mapBook(book: any): Book {
    return {
        id: book.id_livro,
        authorId: book.id_autor,
        title: book.titulo,
        description: book.descricao,
        price: book.preco,
        coverImage: book.capa_imagem,
        pdfFile: book.arquivo_pdf,
        categoryId: book.id_categoria,
        publisherId: book.id_editora,
        collectionId: book.id_colecao,
        featured: book.destaque === 1 || book.destaque === true,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        author: book.autor ? mapAuthor(book.autor) : book.autor,
        category: book.categoria ? mapCategory(book.categoria) : book.categoria,
        publisher: book.editora ? mapPublisher(book.editora) : book.editora,
        collection: book.colecao ? mapCollection(book.colecao) : null,
    };
}

function buildBookFormData(data: BookInput) {
    const formData = new FormData();

    formData.append("titulo", data.title);
    formData.append("descricao", data.description);
    formData.append("preco", String(data.price));
    formData.append("id_categoria", String(data.categoryId));
    formData.append("id_autor", String(data.authorId));
    formData.append("id_editora", String(data.publisherId));

    if (data.collectionId) {
        formData.append("id_colecao", String(data.collectionId));
    }

    if (data.featured !== undefined) {
        formData.append("destaque", String(data.featured));
    }

    if (data.coverImage) {
        formData.append("capa_imagem", data.coverImage as any);
    }

    if (data.pdfFile) {
        formData.append("arquivo_pdf", data.pdfFile as any);
    }

    return formData;
}

export async function getBooks() {
    try {
        const response = await api.get("/livros");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapBook);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getFeaturedBooks() {
    try {
        const response = await api.get("/livros/destaque");
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapBook);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getBookById(id: number) {
    try {
        const response = await api.get("/livros/" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = mapBook(result.data);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getBooksByAuthor(id: number) {
    try {
        const response = await api.get(`/autores/${id}/livros`);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapBook);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getBooksByCollection(id: number) {
    try {
        const response = await api.get("/livros?colecao=" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapBook);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function getBooksByCategory(id: number) {
    try {
        const response = await api.get("/livros?categoria=" + id);
        const result = handleResponse(response);

        if (result.ok) {
            result.data = result.data.map(mapBook);
        }

        return result;
    } catch (error) {
        return handleError(error);
    }
}

export async function createBook(data: BookInput) {
    try {
        const response = await api.post("/livros", buildBookFormData(data), {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function updateBook(id: number, data: BookInput) {
    try {
        const response = await api.put(`/livros/${id}`, buildBookFormData(data), {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export async function deleteBook(id: number) {
    try {
        const response = await api.delete("/livros/" + id);
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
}

export function getBookPdfUrl(filename: string) {
    return `http://10.0.2.2:3000/uploads/${filename}`;
}

export function getBookCoverUrl(filename: string) {
    return `http://10.0.2.2:3000/uploads/${filename}`;
}