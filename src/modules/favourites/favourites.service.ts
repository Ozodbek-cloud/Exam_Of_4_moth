import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { favouriteDto } from './FavouriteDto/favourite.dto';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { UserModel } from 'src/core/entities/user.entities';
@Injectable()
export class FavouritesService {
    constructor(@InjectModel(Favorite_Model) private favouriteModel: typeof Favorite_Model, @InjectModel(Movies_Model) private movieModel: typeof Movies_Model) { }

    async get_favourites() {
        let all = await this.favouriteModel.findAll({ include: [{ model: UserModel }, { model: Movies_Model }] })
        return { success: true, data: all }
    }

    async post_favourites(payload: Partial<favouriteDto>) {
        
        if (!payload.user_id) throw new BadRequestException(`${payload.user_id} is Incorrect check again`)

        let favorite = await this.favouriteModel.create(payload)

        if (!favorite) throw new BadRequestException(`${favorite} is Incorrect check again`)

        let movie = await this.movieModel.findOne({ where: { Id: payload.movie_id } })

        if (!movie?.dataValues.Id) throw new BadRequestException(`${movie} is Incorrect check again`)
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

    async delete_favourite(movie_id: string) {
        
        let deleted = await this.favouriteModel.destroy({where: {
            movie_id: movie_id
        }})
        if (!deleted) throw new NotFoundException(`this ${movie_id} is not found`)
    }
}

