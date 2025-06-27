import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review_Model } from 'src/core/entities/reviews.entities';
import { ReviewDto } from './ReviewDto/dto';
import { UserModel } from 'src/core/entities/user.entities';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review_Model) private reviewModel: typeof Review_Model) {}

    async add_review(payload: Required<ReviewDto>) {
        let create = await this.reviewModel.create(payload)
        return create
    }

    async get_reviews() {
        let all = await this.reviewModel.findAll({include: [{model: UserModel}, {model: Movies_Model}]})
        return all
    }

    async delete_review(id: string) {
        let find_review = await this.reviewModel.destroy({
            where: {
                Id: id
            }
        })
        if (!find_review) throw new NotFoundException(`this ${id} is not found`)

        return {success: true, data: find_review}
    }
}
