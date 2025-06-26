import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories_Model } from 'src/core/entities/categories.entities';

@Module({
  imports: [SequelizeModule.forFeature([Categories_Model])],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
