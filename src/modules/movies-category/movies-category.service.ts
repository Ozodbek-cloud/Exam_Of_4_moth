import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movies_Categories_Model } from 'src/core/entities/movie.cat';
import { MoCatDto } from './MoCatDto/Movies.Category.dto';
import { Categories_Model } from 'src/core/entities/categories.entities';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Injectable()
export class MoviesCategoryService {
    constructor(@InjectModel(Movies_Categories_Model) private movies_category: typeof Movies_Categories_Model) {}

    async create_movie_category(payload: Required<MoCatDto>) {
        let create = await this.movies_category.create(payload)
        return create 
    }

    async Get_All() {
        let all = await this.movies_category.findAll({
            include: [{model: Categories_Model}, {model: Movies_Model}],
        })
        return all
    }

    async delete_cat(id: string) {
        let destroyed = await this.movies_category.destroy({where: {Id: id}})
        
        if (!destroyed) throw new NotFoundException(`this ${id} is not Found`)
        
        return {success: true, data: destroyed}
    }
}
