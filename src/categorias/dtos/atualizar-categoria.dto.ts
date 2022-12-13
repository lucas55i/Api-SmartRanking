import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Evento } from "../interfaces/categorias.interface";

export class  AtualizarCategoriaDto{

    @IsString()
    @IsOptional()
    descriacao: string

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>
}