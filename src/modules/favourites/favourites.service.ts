import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { favouriteDto } from './FavouriteDto/favourite.dto';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { UserModel } from 'src/core/entities/user.entities';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(Favorite_Model)
    private favouriteModel: typeof Favorite_Model,
    @InjectModel(Movies_Model)
    private movieModel: typeof Movies_Model,
  ) {}

  async get_favourites() {
    try {
      const all = await this.favouriteModel.findAll({
        include: [
          { model: UserModel, attributes: ['username'] },
          { model: Movies_Model, attributes: ['title', 'slug', 'description'] },
        ],
      });
      const total = await this.favouriteModel.count();
      return { success: true, data: all, total };
    } catch (error) {
      console.error('Sevimlilarni olishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async post_favourites(user_Id: string, payload: Partial<favouriteDto>) {
    try {
      const { movie_id } = payload;

      if (!movie_id) {
        throw new BadRequestException(`movie_id noto‘g‘ri yoki yo‘q`);
      }

      const movie = await this.movieModel.findOne({ where: { Id: movie_id } });
      if (!movie?.dataValues?.Id) {
        throw new BadRequestException(`Berilgan movie_id mavjud emas`);
      }

      const favorite = await this.favouriteModel.create({ ...payload, user_id: user_Id });
      if (!favorite) {
        throw new InternalServerErrorException(`Sevimlilarni yaratib bo‘lmadi`);
      }

      return {
        success: true,
        message: "Kino sevimlilar ro'yxatiga qo'shildi",
        data: {
          id: favorite.dataValues.Id,
          movie_id: movie.dataValues.Id,
          movie_title: movie.dataValues.title,
          created_at: favorite.dataValues.createdAt,
        },
      };
    } catch (error) {
      console.error('Sevimli qo‘shishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete_favourite(movie_id: string) {
    try {
      const deleted = await this.favouriteModel.destroy({
        where: { movie_id },
      });

      if (!deleted) {
        throw new NotFoundException(`movie_id ${movie_id} topilmadi`);
      }

      return { success: true, message: 'O‘chirildi', data: deleted };
    } catch (error) {
      console.error('Sevimlini o‘chirishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async Get_One_favourite(id: string) {
    try {
      const exists = await this.favouriteModel.findOne({
        where: { Id: id },
      });

      if (!exists) {
        throw new NotFoundException(`ID ${id} bo‘yicha sevimli topilmadi`);
      }

      return exists;
    } catch (error) {
      console.error('Bitta sevimlini olishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
