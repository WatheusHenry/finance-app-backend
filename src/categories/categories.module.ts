// src/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Registra a entidade Category
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule], // Exporta o TypeOrmModule para que outros módulos possam usá-lo
})
export class CategoriesModule {}
