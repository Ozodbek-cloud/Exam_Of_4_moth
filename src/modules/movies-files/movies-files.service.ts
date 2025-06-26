import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies_Files_Model } from 'src/core/entities/movies.files';
import { Movie_Files_Dto } from './MovieDto/movie.dto';

@Injectable()
export class MoviesFilesService {
    constructor(@InjectModel(Movies_Files_Model) private moviesFileModel: typeof Movies_Files_Model) {}

    async add_movie_file(file: Express.Multer.File, payload: Required<Movie_Files_Dto>) {
        let files = `/uploads/files${file.originalname}`
        let add_file = await this.moviesFileModel.create({...payload, file: files})
        return add_file
    }
}
