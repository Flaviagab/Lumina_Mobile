import { AuthorList } from "@/components/Author/AuthorList";
import { H1 } from "@/components/Text";
import { getAuthors } from "@/services/authors";
import type { Author } from "@/types/author";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        async function loadAuthors() {
            const response = await getAuthors();

            if (response.ok) {
                setAuthors(response.data);
            } else {
                console.log("Erro ao buscar autores:", response.data);
            }
        }

        loadAuthors();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
                <H1 className="text-center m-2">Autores</H1>
            <AuthorList
                authors={authors}
                onViewBooks={(author) => console.log("Ver livros de:", author)} //
                onViewMore={(author) => console.log("Ver mais de:", author)} //
            />
        </SafeAreaView>
    );
}