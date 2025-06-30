import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies_Files_Model } from 'src/core/entities/movies.files';

@Injectable()
export class MoviesFilesService {
    constructor(@InjectModel(Movies_Files_Model) private moviesFileModel: typeof Movies_Files_Model) {}


   async get() {
        let all = await this.moviesFileModel.findAll()
        return all
    }
    
}
