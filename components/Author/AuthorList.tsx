import type { Author } from "@/types/author";
import { FlatList } from "react-native";
import { AuthorCard } from "./AuthorCard";

type AuthorListProps = {
    authors: Author[];
    onViewBooks?: (author: Author) => void;
    onViewMore?: (author: Author) => void;
};

export function AuthorList({ authors, onViewBooks, onViewMore }: AuthorListProps) {
    return (
        <FlatList
            data={authors}
            keyExtractor={(item) => String(item.id_autor)}
            renderItem={({ item }) => (
                <AuthorCard
                    author={item}
                    onViewBooks={onViewBooks}
                    onViewMore={onViewMore}
                />
            )}
            contentContainerClassName="px-4 pt-4 pb-8"
        />
    );
}