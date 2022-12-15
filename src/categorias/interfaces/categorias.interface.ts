import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria extends Document {
    categoria: string;
    readonly categorias: string;
    descricao: string;
    eventos: Array<Evento>
    jogadores: Array<Jogador>
}

export interface Evento{
    name: string;
    operacao: string;
    valor: number;
}