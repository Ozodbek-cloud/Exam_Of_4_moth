import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { MovieDto } from './MovieDto/movie.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movies_Model) private moviesModel: typeof Movies_Model) { }

    async get_movies(page: number, limit: number, category: string, search: string, subscription_type: string) {
        const offset = (page - 1) * limit;

        const whereClause: any = {};

        if (search) whereClause.title = { [Op.iLike]: `%${search}%` };
    
        if (subscription_type)  whereClause.subscription_type = subscription_type;

        if (category) {
            whereClause.categories = {
                [Op.contains]: [category]
            };
        }

        const { rows: movies, count: total } = await this.moviesModel.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            order: [['release_year', 'DESC']],
            attributes: ['id', 'title', 'slug', 'poster_url', 'release_year', 'rating', 'subscription_type', 'categories']
        });

        const totalPages = Math.ceil(total / limit);

        return { success: true, data: { movies, pagination: { total, page, limit, pages: totalPages } } };
    }
    async createMovie(payload: Required<MovieDto>, poster: Express.Multer.File) {
        const posterUrl = `/uploads/posters/${poster.filename}`;

        const created = await this.moviesModel.create({...payload, poster_url: posterUrl});

        return {
            success: true,
            message: 'Movie successfully created',
            data: created
        };
    }

}
