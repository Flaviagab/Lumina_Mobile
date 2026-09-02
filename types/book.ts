import type { Author } from "@/types/author";

export type Publisher = {
    id_editora: number;
    nome: string;
    descricao: string;
};


export interface Book {
    id_livro: number;
    titulo: string;
    autor: Author;
    editora?: Publisher;
    capa_imagem?: string;
    sinopse?: string;
}