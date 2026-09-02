import { CategoryCarousel } from "@/components/Category/CategoryCarousel";
import { HomeHeader } from "@/components/HomeHeader";
import { getCategories } from "@/services/categories";
import type { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedId, setSelectedId] = useState<string>();

    useEffect(() => {
        async function loadCategories() {
            const response = await getCategories();

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
                selectedId={selectedId}
                onSelect={(category) => setSelectedId(category.id)}
            />
        </View>
    );
}