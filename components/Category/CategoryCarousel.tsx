import type { Category } from "@/types/category";
import { FlatList } from "react-native";
import { CategoryChip } from "./CategoryChip";

type Props = {
    categories: Category[];
    selectedId?: number;
    onSelect: (categories: Category) => void;
};

export const CategoryCarousel = (props: Props) => {
    return (
        <FlatList
            data={props.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            className="flex-grow-0 pt-5 mb-10 mt-2"
            contentContainerClassName="gap-2 px-4"
            renderItem={({ item }) => (
                <CategoryChip
                    label={item.name}
                    selected={item.id === props.selectedId}
                    onPress={() => props.onSelect(item)}
                />
            )}
        />
    );
};