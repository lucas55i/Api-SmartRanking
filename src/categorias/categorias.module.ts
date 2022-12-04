import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { CategoriasController } from './controller/categorias.controller';
import { CategoriaSchema } from './schema/categoria.schema';
import { CategoriasService } from './services/categorias.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }])],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule { }
