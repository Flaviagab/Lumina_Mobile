import { AuthorDetailsModal } from "@/components/Author/AuthorDetailsModal";
import { AuthorList } from "@/components/Author/AuthorList";
import { H1 } from "@/components/Text";
import { getAuthors } from "@/services/authors";
import type { Author } from "@/types/author";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            async function loadAuthors() {
                const response = await getAuthors();

                if (response.ok) {
                    setAuthors(response.data);
                } else {
                    console.log("Erro ao buscar autores:", response.data);
                }
            }

            loadAuthors();
        }, [])
    );

    function handleViewMore(author: Author) {
        setSelectedAuthor(author);
        setModalVisible(true);
    }

    function handleCloseModal() {
        setModalVisible(false);
        setSelectedAuthor(null);
    }

    return (
        <SafeAreaView className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <H1 className="text-center m-2">Autores</H1>
            <AuthorList
                authors={authors}
                onViewBooks={(author) => {router.push({pathname: "/(author)/[id]", params: {id: author.id} })}}
                onViewMore={handleViewMore}
            />

            <AuthorDetailsModal author={selectedAuthor} visible={modalVisible} onClose={handleCloseModal} />
        </SafeAreaView>
    );
}