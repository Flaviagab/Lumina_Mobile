import { CategoryCarousel } from "@/components/Category/CategoryCarousel";
import { HomeHeader } from "@/components/HomeHeader";
import { useState } from "react";
import { View } from "react-native";

type Categoria = {
    id: string;
    nome: string;
};

const CATEGORIAS_MOCK: Categoria[] = [
    { id: "1", nome: "Fantasia" },
    { id: "2", nome: "Terror" },
    { id: "3", nome: "Infantil" },
    { id: "4", nome: "Suspense" },
    { id: "5", nome: "Romance" },
];

export default function Home() {
    const [selecionadaId, setSelecionadaId] = useState<string>();

    return (
        <View className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <HomeHeader userName="Ana Júlia" />

            <CategoryCarousel
                categorias={CATEGORIAS_MOCK}
                selecionadaId={selecionadaId}
                onSelect={(categoria) => setSelecionadaId(categoria.id)}
            />
        </View>
    );
}