import { Module } from '@nestjs/common';
import { MoviesCategoryService } from './movies-category.service';
import { MoviesCategoryController } from './movies-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movies_Categories_Model } from 'src/core/entities/movie.cat';

@Module({
  imports: [SequelizeModule.forFeature([Movies_Categories_Model])],
  providers: [MoviesCategoryService],
  controllers: [MoviesCategoryController]
})
export class MoviesCategoryModule {}
