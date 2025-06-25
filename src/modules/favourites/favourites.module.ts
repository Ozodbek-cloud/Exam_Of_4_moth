import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Module({
  imports: [SequelizeModule.forFeature([Favorite_Model, Movies_Model])],
  providers: [FavouritesService],
  controllers: [FavouritesController]
})
export class FavouritesModule {}
