export type Category = {
    id: number;
    name: string;
    description: string;
    featured: boolean;
};

export type CategoryInput = {
    name: string;
    description: string;
    featured?: boolean;
};