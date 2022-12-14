import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { DesafiosController } from './controller/desafios.controller';
import { DesafioSchema } from './schema/desafio.schema';
import { PartidaSchema } from './schema/partida.schema';
import { DesafiosService } from './service/desafios.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Desafio', schema: DesafioSchema},
      {name: 'Partida', schema: PartidaSchema}]),
    JogadoresModule,
    CategoriasModule],

  controllers: [DesafiosController],
  providers:[DesafiosService]
})
export class DesafiosModule {}
