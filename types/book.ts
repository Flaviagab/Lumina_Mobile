import { Author } from "./author";
import { Category } from "./category";

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
    id: number;
    authorId: number;
    title: string;
    description: string;
    price: number;
    coverImage: string;
    pdfFile: string;
    categoryId: number;
    publisherId: number;
    collectionId: number | null;
    featured: boolean;
    createdAt: string;
    updatedAt: string;

    author: Author;
    category: Category;
    publisher: Publisher;
    collection: Collection;
};

export type BookInput = {
    title: string;
    description: string;
    price: number;
    categoryId: number;
    authorId: number;
    publisherId: number;
    collectionId?: number | null;
    featured?: boolean;
    coverImage?: { uri: string; name: string; type: string };
    pdfFile?: { uri: string; name: string; type: string };
};