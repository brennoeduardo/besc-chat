export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    codigo_verificacao: string;
}

export interface Messages {
    message: string;
    data?: any;
    usuario_id?: number;
}