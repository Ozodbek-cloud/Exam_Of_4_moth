import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories_Model } from 'src/core/entities/categories.entities';
import { CategoryDto } from './CategoryDto/category.dto';
import { Movies_Categories_Model } from 'src/core/entities/movie.cat';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categories_Model) private categoryModel: typeof Categories_Model){}

    async create_category(payload: Required<CategoryDto>) {
        let newCat = await this.categoryModel.create(payload)
        return newCat
    }

    async get_all() {
        let all = await this.categoryModel.findAll()
        return all
    }

    async put_category(id: string, payload: Required<CategoryDto>) {
        let exists = await this.categoryModel.findOne({
            where : {
                Id: id
            }
        })
        if (!exists) throw new NotFoundException(`this ${id } not found`)

        let Updated_Cat = await exists.update(payload)

        return Updated_Cat
    }

    async delete_category(id: string) {
       
        let deleted = await this.categoryModel.destroy({
            where: {Id: id}
        })
        if (!deleted) throw new NotFoundException(`this ${id } not found`)
        
        return {success: true, data: deleted}
    }
}
