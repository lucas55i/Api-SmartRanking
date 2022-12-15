import { Body, Controller, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtualizarCategoriaDto } from '../dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from '../dtos/criat-categoria.dto';
import { Categoria } from '../interfaces/categorias.interface';
import { CategoriasService } from '../services/categorias.service';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto)
    }

    @Get()
    async consultarCategorias(
        @Query() params: string[]): Promise<Array<Categoria> | Categoria> {
        const idCategoria = params['idCategoria']
        const idJogador = params['idJogador']

        if (idCategoria) {
            return await this.categoriasService.consultarCategoriaPeloId(idCategoria)
        }

        if (idJogador) {
            return await this.categoriasService.consultarCategoriaDoJogador(idJogador)
        }

        return await this.categoriasService.consultarTodasCategorias()

    }


    @Get('/:categoria')
    async consultarCategoriaPeloId(@Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaPeloId(categoria);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto, @Param('categoria') categoria: string): Promise<void> {
        await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto)
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(@Param() params: string[]): Promise<void>{
        console.log(`params: ${JSON.stringify(params)}`);
        return await this.categoriasService.atribuirCategoriaJogador(params)

    }
}
