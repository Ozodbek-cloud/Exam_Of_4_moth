import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review_Model } from 'src/core/entities/reviews.entities';
import { ReviewDto } from './ReviewDto/dto';
import { UserModel } from 'src/core/entities/user.entities';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review_Model) private reviewModel: typeof Review_Model
  ) {}

  async add_review(payload: Required<ReviewDto>, user: string, movie_id: string) {
    try {
      const newReview = await this.reviewModel.create({
        ...payload,
        user_id: user,
        movie_id,
      });
      return { success: true, data: newReview };
    } catch (error) {
      throw new InternalServerErrorException('Review qo‘shishda xatolik yuz berdi');
    }
  }

  async get_reviews() {
    try {
      const all = await this.reviewModel.findAll({
        include: [{ model: UserModel }, { model: Movies_Model }],
      });
      return all;
    } catch (error) {
      throw new InternalServerErrorException('Reviewlarni olishda xatolik yuz berdi');
    }
  }

  async delete_review(id: string) {
    try {
      const deleted = await this.reviewModel.destroy({
        where: {
          Id: id,
        },
      });

      if (!deleted) {
        throw new NotFoundException(`Review ID: ${id} topilmadi`);
      }

      return { success: true, data: deleted };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Reviewni o‘chirishda xatolik yuz berdi');
    }
  }
}
