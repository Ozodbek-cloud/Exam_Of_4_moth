import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { favouriteDto } from './FavouriteDto/favourite.dto';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { v4 as uuidv4 } from "uuid"
import { UserModel } from 'src/core/entities/user.entities';
@Injectable()
export class FavouritesService {
    constructor(@InjectModel(Favorite_Model) private favouriteModel: typeof Favorite_Model, @InjectModel(Movies_Model) private movieModel: typeof Movies_Model) { }

    async get_favourites() {
        let all = await this.favouriteModel.findAll({include: [{ model: UserModel}, {model: Movies_Model}]})
        return { success: true, data: all }
    }

    async post_favourites( payload: favouriteDto) {
    const movie = await this.movieModel.findByPk(payload.movie_id);

    if (!movie) {
        throw new NotFoundException("Kino topilmadi");
    }

    const favorite = await this.favouriteModel.create({
        id: uuidv4(), 
        user_id: payload.user_id,
        movie_id: movie.Id, 
    });

    return { success: true, message: "Kino sevimlilar ro'yxatiga qo'shildi",  data: { id: favorite.Id, movie_id: movie.Id, movie_title: movie.title}};
}

    }

