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
import { MovieQuery } from './MovieDto/movie.query.dto';
import { Updated_MovieDto } from './MovieDto/for_updated_movie.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movies_Model) private moviesModel: typeof Movies_Model, @InjectModel(Movies_Files_Model) private moviesFileModel: typeof Movies_Files_Model) { }

    async getAll(query: MovieQuery) {
        let where: any = {};

        if (query.search) {
            where['title'] = {
                [Op.iLike]: `%${query.search.trim()}%`
            };
        }

        if (query.subscription_type) {
            where['subscription_type'] = query.subscription_type.trim();
        }

        let include: any = [
            {
                model: Categories_Model,
                attributes: ['name'],
                where: query.category ? { name: query.category } : undefined
            }
        ];

        let limit = query.limit ? +query.limit : 10;
        let offset = query.page ? (+query.page - 1) * limit : 0;

        let movie = await this.moviesModel.findAll({
            where,
            include,
            limit,
            offset
        });

        let movieData = movie.map(m => m.get({ plain: true }));
        let total = await this.moviesModel.count({ where, include });

        return {
            success: true,
            data: movieData,
            pagination: {
                total,
                page: query.page || 1,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async createMovie(id: string, payload: MovieDto, poster: Express.Multer.File) {
        let newMovie = await this.moviesModel.create({ ...payload, user_id: id, poster_url: poster.path })
        if (!id) throw new NotFoundException(`this ${id} is not Found`)

        return {
            success: true,
            message: "New movie created",
            data: newMovie
        }
    }

    async create(id: string, payload: Movie_Files_Dto, filename: Express.Multer.File) {
        if (!id) throw new NotFoundException(`this ${id} is not Found`)

        if (!filename) throw new NotFoundException(`this ${filename} is not Found`)

        let movie = await this.moviesModel.findOne({
            where: {
                Id: id
            }
        })
        if (!movie) {
            throw new NotFoundException("Movie spesific id not found")
        }
        const size_mb = parseFloat((filename.size / (1024 * 1024)).toFixed(2));
        let newMovieFile = await this.moviesFileModel.create({ ...payload, movie_id: id, file_url: filename.path, size: size_mb })
        return {
            success: true,
            message: "new MovieFile created",
            data: { ...newMovieFile.dataValues, movie: movie.dataValues },
        }
    }

    async get_by_slug(slug: string) {
        let get_Slug = await this.moviesModel.findAll({
            where: {
                slug: slug
            }, include: [{ model: Movies_Files_Model, attributes: ['quality', 'language'] },
            { model: Favorite_Model, attributes: ['movie_id'] },
            { model: Review_Model, attributes: ['rating', 'comment'] },
            { model: Categories_Model, attributes: ['name'] }]
        })
        if (!get_Slug) throw new BadRequestException(`this ${slug} is not found`)

        return {success: true, dataa: get_Slug}
    }
    async delete_movie(id: string) {
       let fin_delete = await this.moviesModel.destroy({
           where: {
            Id: id
           }
       })
       if (!fin_delete) throw new NotFoundException(`this ${id} is not Found`)
       return { success: true, data: fin_delete}
    }

    async put_movie(id : string, payload: Updated_MovieDto) {
        let find = await this.moviesModel.findOne(
            {where: {
                Id: id
            }}
        )
        if (!id) throw new NotFoundException(` this ${id} is not Found`)

        let updated = await find?.update(payload)
        return {success: true, data: updated}
    }
   async Get_All() {
        let all = await this.moviesModel.findAll()
        return all  
  }

}
