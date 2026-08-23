import { FlatList } from "react-native";
import { CategoryChip } from "./CategoryChip";

type Categoria = {
    id: string;
    nome: string;
};

type Props = {
    categorias: Categoria[];
    selecionadaId?: string;
    onSelect: (categoria: Categoria) => void;
};

export const CategoryCarousel = ({ categorias, selecionadaId, onSelect }: Props) => {
    return (
        <FlatList
            data={categorias}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            className="flex-grow-0 pt-5"
            contentContainerClassName="gap-2 px-4"
            renderItem={({ item }) => (
                <CategoryChip
                    label={item.nome}
                    selected={item.id === selecionadaId}
                    onPress={() => onSelect(item)}
                />
            )}
        />
    );
};