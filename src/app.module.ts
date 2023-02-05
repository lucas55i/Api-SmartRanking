import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://m001-studente:m001-mongodb-basics@cluster0.ty01u8u.mongodb.net/smartranking?retryWrites=true&w=majority',
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
