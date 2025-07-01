import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
import { deleteMovieFile } from 'src/common/utils/delere-utils';
import * as path from 'path';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies_Model) private moviesModel: typeof Movies_Model,
    @InjectModel(Movies_Files_Model) private moviesFileModel: typeof Movies_Files_Model,
    @InjectModel(Watch_History_Model) private watchModel: typeof Watch_History_Model
  ) { }

  async getAll(query: MovieQuery) {
    try {
      let where: any = {};

      if (query.search) {
        where['title'] = {
          [Op.iLike]: `%${query.search.trim()}%`,
        };
      }

      if (query.subscription_type) {
        where['subscription_type'] = query.subscription_type.trim();
      }

      let include: any = [
        {
          model: Categories_Model,
          attributes: ['name'],
          where: query.category ? { name: query.category } : undefined,
        },
      ];

      let limit = query.limit ? +query.limit : 10;
      let offset = query.page ? (+query.page - 1) * limit : 0;

      let movie = await this.moviesModel.findAll({
        where,
        include,
        limit,
        offset,
      });

      let movieData = movie.map((m) => m.get({ plain: true }));
      let total = await this.moviesModel.count({ where, include });

      return {
        success: true,
        data: movieData,
        pagination: {
          total,
          page: query.page || 1,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('getAll error:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async createMovie(id: string, payload: MovieDto, poster: Express.Multer.File) {
    try {
      let newMovie = await this.moviesModel.create({ ...payload, user_id: id, poster_url: poster.path });
      if (!id) throw new NotFoundException(`this ${id} is not Found`);

      return {
        success: true,
        message: 'New movie created',
        data: newMovie,
      };
    } catch (error) {
      console.error('createMovie error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(id: string, payload: Movie_Files_Dto, filename: Express.Multer.File) {
    try {
      if (!id) throw new NotFoundException(`this ${id} is not Found`);
      if (!filename) throw new NotFoundException(`this ${filename} is not Found`);

      let movie = await this.moviesModel.findOne({ where: { Id: id } });
      if (!movie) throw new NotFoundException('Movie spesific id not found');

      const size_mb = parseFloat((filename.size / (1024 * 1024)).toFixed(2));
      let newMovieFile = await this.moviesFileModel.create({
        ...payload,
        movie_id: id,
        file_url: filename.path,
        size: size_mb,
      });

      return {
        success: true,
        message: 'new MovieFile created',
        data: { ...newMovieFile.dataValues, movie: movie.dataValues },
      };
    } catch (error) {
      console.error('create movie file error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_by_slug(user_id: string, slug: string) {
  try {
    const movie = await this.moviesModel.findOne({
      where: { slug },
      include: [
        { model: Movies_Files_Model, attributes: ['quality', 'language', 'size'] },
        { model: Favorite_Model, attributes: ['movie_id'] },
        { model: Review_Model, attributes: ['rating', 'comment', 'count'] },
        { model: Categories_Model, attributes: ['name'] },
      ],
    });

    let createWatch = await this.watchModel.create({user_id: user_id, movie_id: movie?.dataValues.Id, watched_duration: 0, watched_persentage: 0})


    if (!movie) {
      throw new BadRequestException(`Movie with slug '${slug}' not found`);
    }


    return {
      success: true,
      data: movie,
      createWatch
    };
  } catch (error) {
    console.error('get_by_slug error:', error);
    if (error instanceof BadRequestException) throw error;
    throw new InternalServerErrorException(error.message);
  }
}


  async delete_movie(id: string) {
    try {
      let fin_delete = await this.moviesModel.destroy({ where: { Id: id } });
      if (!fin_delete) throw new NotFoundException(`this ${id} is not Found`);
      return { success: true, data: fin_delete };
    } catch (error) {
      console.error('delete_movie error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async put_movie(id: string, payload: Updated_MovieDto, filename: Express.Multer.File) {
    try {
      const find = await this.moviesModel.findOne({ where: { Id: id } });

      if (!find) throw new NotFoundException(`Movie with ID ${id} not found`);

      if (find.dataValues.poster_url !== filename.filename) {
        const oldPath = path.resolve('uploads/posters', find.dataValues.poster_url);
        deleteMovieFile(oldPath);
      }

      const updated = await find.update({
        ...payload,
        poster_url: filename.filename,
      });

      return { success: true, data: updated };
    } catch (error) {
      console.error('put_movie error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
  async get_all() {
    let all_movies = await this.moviesModel.findAll({include: [{model: Categories_Model, attributes: ['name']}]})
    return all_movies
  }
}
