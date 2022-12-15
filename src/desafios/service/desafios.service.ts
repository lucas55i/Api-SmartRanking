import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from 'src/categorias/dtos/criat-categoria.dto';
import { CategoriasService } from 'src/categorias/services/categorias.service';
import { JogadoresService } from 'src/jogadores/services/jogadores.service';
import { CriarDesafioDto } from '../dtos/criar-desafio.dto';
import { DesafioStatus } from '../interfaces/desafio-status.enum';
import { Desafio, Partida } from '../interfaces/desafio.interface';

@Injectable()
export class DesafiosService {
    constructor(
        @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
        @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
        private readonly categoriaService: CategoriasService, 
        private readonly jogadoresService: JogadoresService,
        ){}
    private readonly logger = new Logger(DesafiosService.name)

    async criarDesafio(criarDesafioDto: CriarDesafioDto):Promise<Desafio>{
        // Verifica se os jogadores estão cadastrados
        const jogadores = await this.jogadoresService.consultarTodosJogadores()
        
        criarDesafioDto.jogadores.map(jogadorDto => {
            const jogadorFilter = jogadores.filter( jogador => jogador._id == jogadorDto._id )

            if (jogadorFilter.length == 0) {
                throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`)
            }
        })

        
        // Verificar se o solicitante é um dos jogadores da partida
         
        const solicitanteEhJogadorDaPartida = await criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante)

        this.logger.log(`solicitanteEhJogadorDaPartida: ${solicitanteEhJogadorDaPartida}`)

        if(solicitanteEhJogadorDaPartida.length == 0) {
            throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
        }

         /*
        Descobrimos a categoria com base no ID do jogador solicitante
        */
        const categoriaDoJogador = await this.categoriaService.consultarCategoriaDoJogador(criarDesafioDto.solicitante)

        /*
        Para prosseguir o solicitante deve fazer parte de uma categoria
        */
        if (!categoriaDoJogador) {
            throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`)
        }

        const desafioCriado = new this.desafioModel(criarDesafioDto)
        desafioCriado.categoria = categoriaDoJogador.categoria
        desafioCriado.dataHoraSolicitacao = new Date()
        /*
        Quando um desafio for criado, definimos o status desafio como pendente
        */
        desafioCriado.status = DesafioStatus.PENDENTE
        this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`)
        return await desafioCriado.save()
    }
}
