import { BooksCarousel } from "@/components/Books/BooksCarousel";
import { BookDetailsModal } from "@/components/Books/BooksDetailsModal";
import { CategoryCarousel } from "@/components/Category/CategoryCarousel";
import { HomeHeader } from "@/components/HomeHeader";
import { getBookPdfUrl, getBooks, getFeaturedBooks } from "@/services/books";
import { getCategories } from "@/services/categories";
import type { Book } from "@/types/book";
import type { Category } from "@/types/category";
import { useFocusEffect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedId, setSelectedId] = useState<number>();
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [popularBooks, setPopularBooks] = useState<Book[]>([]);

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    function getRandomBooks(books: Book[], amount: number) {
        return [...books]
            .sort(() => Math.random() - 0.5)
            .slice(0, amount);
    }

    async function handleReadBook(book: Book) {
        const pdfUrl = getBookPdfUrl(book.arquivo_pdf);

        await WebBrowser.openBrowserAsync(pdfUrl);

    }

    function handleViewMore(book: Book) {
        setSelectedBook(book);
    }

    async function loadCategories() {
        const response = await getCategories();

        if (response.ok) {
            setCategories(response.data);
        } else {
            console.log("Erro ao buscar categorias:", response.data);
        }
    }

    async function loadFeaturedBooks() {
        const response = await getFeaturedBooks();

        if (response.ok) {
            setFeaturedBooks(response.data);
        } else {
            console.log(
                "Erro ao buscar livros em destaque:",
                response.data
            );
        }
    }

    async function loadBooks() {
        const response = await getBooks();

        if (response.ok) {
            setNewBooks(getRandomBooks(response.data, 5));
            setPopularBooks(getRandomBooks(response.data, 5));
        } else {
            console.log("Erro ao buscar livros:", response.data);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadCategories();
            loadFeaturedBooks();
            loadBooks();
        }, [])
    );

    return (
        <ScrollView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <HomeHeader />

            <CategoryCarousel
                categories={categories}
                selectedId={selectedId}
                onSelect={(category) => setSelectedId(category.id)}
            />

            <BooksCarousel
                title="Destaques"
                books={featuredBooks}
                onRead={handleReadBook}
                onViewMore={handleViewMore}
            />

            <BooksCarousel
                title="Novidades"
                books={newBooks}
                onRead={handleReadBook}
                onViewMore={handleViewMore}
            />

            <BooksCarousel
                title="Mais populares"
                books={popularBooks}
                onRead={handleReadBook}
                onViewMore={handleViewMore}
            />

            <BookDetailsModal
                book={selectedBook}
                visible={selectedBook !== null}
                onClose={() => setSelectedBook(null)}
            />
        </ScrollView>
    );
}