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
        let all = await this.favouriteModel.findAll({ include: [{ model: UserModel }, { model: Movies_Model }] })
        return { success: true, data: all }
    }

    async post_favourites(payload: Partial<favouriteDto>) {

        let favorite = await this.favouriteModel.create(payload)

        let movie = await this.movieModel.findOne({ where: { Id: payload.movie_id } })
        
        return {
            success: true,
            message: "Kino sevimlilar ro'yxatiga qo'shildi",
            data: {
                id: favorite.dataValues.Id,
                movie_id: movie?.dataValues.Id,
                movie_title: movie?.dataValues.title,
                created_at: favorite.dataValues.createdAt,
            }

        };
    }

}

