export type Author = {
    id_autor: number;
    nome: string;
    biografia: string;
    foto: string;
};

export type Category = {
    id_categoria: number;
    nome: string;
    descricao: string;
    destaque: boolean;
};

export type Publisher = {
    id_editora: number;
    nome: string;
    descricao: string;
};

export type Collection = {
    id_colecao: number;
    nome: string;
    descricao: string;
} | null;

export type Book = {
    id_livro: number;
    id_autor: number;
    titulo: string;
    descricao: string;
    preco: number;
    capa_imagem: string;
    arquivo_pdf: string;
    id_categoria: number;
    id_editora: number;
    id_colecao: number | null;
    destaque: boolean;
    createdAt: string;
    updatedAt: string;

    autor: Author;
    categoria: Category;
    editora: Publisher;
    colecao: Collection;
};