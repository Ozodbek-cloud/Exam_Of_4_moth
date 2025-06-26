import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { JwtModule } from '@nestjs/jwt';
import { Movies_Files_Model } from 'src/core/entities/movies.files';

@Module({
  imports: [SequelizeModule.forFeature([Movies_Model, Movies_Files_Model]), JwtModule],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
