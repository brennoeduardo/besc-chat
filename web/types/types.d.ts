export interface Message {
    id: number;
    content: string;
    date: string;
}

export interface User {
    id: number | null;
    nome: string;
    email: string;
    senha?: string;
}