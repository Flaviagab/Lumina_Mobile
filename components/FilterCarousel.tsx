import { FlatList, Text, View } from "react-native";
import { FilterChip } from "./FilterChip";

type Item = {
    id: number;
    name: string;
};

type Props = {
    items: Item[];
    selectedId?: number;
    title: string;
    onSelect: (item: Item) => void;
};

export const FilterCarousel = (props: Props) => {
    return (
        <View>
            <Text className="text-2xl font-semibold text-textPrimary dark:text-dark-textPrimary px-4 my-5">
                {props.title}
            </Text>
            <FlatList
                data={props.items}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                className="flex-grow-0 mb-5"
                contentContainerClassName="gap-2 px-4"
                renderItem={({ item }) => (
                    <FilterChip
                        label={item.name}
                        selected={item.id === props.selectedId}
                        onPress={() => props.onSelect(item)}
                    />
                )}
            />
        </View>
    );
};