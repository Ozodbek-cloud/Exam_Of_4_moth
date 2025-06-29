import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { MovieDto } from './MovieDto/movie.dto';
import { Movies_Files_Model } from 'src/core/entities/movies.files';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { Review_Model } from 'src/core/entities/reviews.entities';
import { Movie_Files_Dto } from '../movies-files/MovieDto/movie.dto';
import { Categories_Model } from 'src/core/entities/categories.entities';
import { Movies_Categories_Model } from 'src/core/entities/movie.cat';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movies_Model) private moviesModel: typeof Movies_Model, @InjectModel(Movies_Files_Model) private moviesFileModel: typeof Movies_Files_Model) { }

    async get_movies(page: number, limit: number, category: string, search: string, subscription_type: string) {
        const offset = (page - 1) * limit;

        const whereClause: any = {};

        if (search) whereClause.title = { [Op.iLike]: `%${search}%` };

        if (subscription_type) whereClause.subscription_type = subscription_type;

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
    async createMovie(id:string, payload: MovieDto, poster: Express.Multer.File) {
        let newMovie = await this.moviesModel.create({...payload,user_id:id,poster_url:poster.path})
         if (!id) throw new NotFoundException(`this ${id} is not Found`)

        return {
            success: true,
            message: "New movie created",
            data: newMovie
        }
    }

    async create(id:string, payload: Movie_Files_Dto, filename: Express.Multer.File) {
        if (!id) throw new NotFoundException(`this ${id} is not Found`)

        if (!filename) throw new NotFoundException(`this ${filename} is not Found`)
            
        let movie = await this.moviesModel.findOne({
            where: {
                Id: id
            }
        })
        if(!movie){
               throw new NotFoundException("Movie spesific id not found") 
        }
        let newMovieFile = await this.moviesFileModel.create({...payload,movie_id: id, file_url: filename.path})
        return {
            success: true,
            message: "new MovieFile created",
            data: {...newMovieFile.dataValues, movie: movie.dataValues},
        }
    }

    async get_by_slug(slug: string) {
        let get_Slug = await this.moviesModel.findAll({
            where: {
                slug: slug
            }, include: [{ model: Movies_Files_Model, attributes: ['quality', 'language'] },
              { model: Favorite_Model, attributes: ['movie_id']},
              { model: Review_Model, attributes: ['rating', 'comment'] },
            {model: Movies_Categories_Model, attributes: ['name']}]
        })
        if (!get_Slug) throw new BadRequestException(`this ${slug} is not found`)

        return get_Slug
    }

}
