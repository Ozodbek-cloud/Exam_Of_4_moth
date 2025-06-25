import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Module({
  imports: [SequelizeModule.forFeature([Movies_Model])],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
