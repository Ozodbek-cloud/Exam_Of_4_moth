import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { MovieDto } from './MovieDto/movie.dto';
import { Movies_Files_Model } from 'src/core/entities/movies.files';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { Review_Model } from 'src/core/entities/reviews.entities';

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

    async get_by_slug(slug: string) {
       let get_Slug = await this.moviesModel.findAll({
        where: {
            slug: slug
        }, include: [{model: Movies_Files_Model}, {model: Favorite_Model}, {model: Review_Model}]
       })
       if (!get_Slug) throw new BadRequestException(`this ${slug} is not found`)

    return get_Slug
    }

}
