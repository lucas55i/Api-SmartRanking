import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { Jogador } from '../interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from '../pipes/jogadores-validacao-parametros.pipe';
import { JogadoresService } from '../services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloid(
    @Query('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete()
  async deletarJogador(@Query('email', JogadoresValidacaoParametrosPipe) email: string): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
