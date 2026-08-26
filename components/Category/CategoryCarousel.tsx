import { FlatList } from "react-native";
import { CategoryChip } from "./CategoryChip";

type Category = {
    id: string;
    name: string;
};

type Props = {
    categories: Category[];
    selecionadaId?: string;
    onSelect: (categories: Category) => void;
};

export const CategoryCarousel = (props: Props) => {
    return (
        <FlatList
            data={props.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            className="flex-grow-0 pt-5"
            contentContainerClassName="gap-2 px-4"
            renderItem={({ item }) => (
                <CategoryChip
                    label={item.name}
                    selected={item.id === props.selecionadaId}
                    onPress={() => props.onSelect(item)}
                />
            )}
        />
    );
};