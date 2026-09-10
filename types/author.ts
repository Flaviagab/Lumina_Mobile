export type Author = {
    id: number;
    name: string;
    bio: string;
    photo: string;
};

export type AuthorInput = {
    name: string;
    bio: string;
    photo?: { uri: string; name: string; type: string };
};