import { CategoryCarousel } from "@/components/Category/CategoryCarousel";
import { HomeHeader } from "@/components/HomeHeader";
import { getCategories } from "@/services/categories";
import { useEffect, useState } from "react";
import { View } from "react-native";

type Category = {
    id: string;
    name: string;
};

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selecionadaId, setSelecionadaId] = useState<string>();

    useEffect(() => {
        async function loadCategories() {
            const response = await getCategories();

            console.log("Resposta das categorias:", response);

            if (response.ok) {
                setCategories(response.data);
            } else {
                console.log("Erro ao buscar categorias:", response.data);
            }
        }

        loadCategories();
    }, []);

    return (
        <View className="flex-1 bg-bodyBg dark:bg-dark-bodyBg">
            <HomeHeader userName="Ana Júlia" />

            <CategoryCarousel
                categories={categories}
                selecionadaId={selecionadaId}
                onSelect={(category) => setSelecionadaId(category.id)}
            />
        </View>
    );
}