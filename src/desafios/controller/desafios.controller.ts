import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtribuirDesafioPartidaDto } from '../dtos/atribuir-desafio.dto';
import { AtualizarDesafioDto } from '../dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from '../dtos/criar-desafio.dto';
import { Desafio } from '../interfaces/desafio.interface';
import { DesafioStatusValidacaoPipe } from '../pipes/desfio-status-validation.pipe';
import { DesafiosService } from '../service/desafios.service';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) { }

    private readonly logger = new Logger(DesafiosController.name)

    @Post()
    @UsePipes(ValidationPipe)
    async criaDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)
        return await this.desafiosService.criarDesafio(criarDesafioDto)
    }

    @Get()
    async consultarDesafios(@Query('idJogador') _id: string): Promise<Array<Desafio>> {
        return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id) : await this.desafiosService.consultarTodosDesafios()
    }

    @Put('/:desafio')
    async atualizarDesafio(@Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto, @Param('desafio') _id: string): Promise<void> {
        await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto)
    }

    @Post('/:desafio/partida/')
    async atribuirDesafioPartida(@Body(ValidationPipe) atribuirDesafioPartida: AtribuirDesafioPartidaDto, @Param('desafio') _id: string): Promise<void> {
        return await this.desafiosService.atribuirDesafioPartida(_id, atribuirDesafioPartida)
    }

    @Delete('/:_id')
    async deletarDesafio(
        @Param('_id') _id: string): Promise<void> {
        this.desafiosService.deletarDesafio(_id)
    }

}
