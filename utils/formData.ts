
type BookFormInput = {
    title: string;
    description: string;
    price: string;
    categoryId: string;
    authorId: string;
    coverUri: string;
    pdfUri: string;
};

export function buildBookFormData(data: BookFormInput) {
    const formData = new FormData();

    formData.append("titulo", data.title);
    formData.append("descricao", data.description);
    formData.append("preco", data.price);
    formData.append("id_categoria", data.categoryId);
    formData.append("id_autor", data.authorId);

    formData.append("capa_imagem", {
        uri: data.coverUri,
        name: "capa.jpg",
        type: "image/jpeg",
    } as any);

    formData.append("arquivo_pdf", {
        uri: data.pdfUri,
        name: "livro.pdf",
        type: "application/pdf",
    } as any);

    return formData;
}

type AuthorFormInput = {
    name: string;
    biography: string;
    photoUri?: string;
};

export function buildAuthorFormData(data: AuthorFormInput) {
    const formData = new FormData();

    formData.append("nome", data.name);
    formData.append("biografia", data.biography);

    if (data.photoUri) {
        formData.append("foto", {
            uri: data.photoUri,
            name: "foto.jpg",
            type: "image/jpeg",
        } as any);
    }

    return formData;
}

type UserFormInput = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    photoUri?: string;
};

export function buildUserFormData(data: UserFormInput) {
    const formData = new FormData();

    formData.append("nome", data.name);
    formData.append("email", data.email);
    formData.append("senha", data.password);
    formData.append("cpf", data.cpf);

    if (data.photoUri) {
        formData.append("foto_perfil", {
            uri: data.photoUri,
            name: "foto.jpg",
            type: "image/jpeg",
        } as any);
    }

    return formData;
}