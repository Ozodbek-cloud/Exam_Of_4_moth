import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories_Model } from 'src/core/entities/categories.entities';
import { CategoryDto } from './CategoryDto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories_Model)
    private categoryModel: typeof Categories_Model,
  ) {}

  async create_category(payload: Required<CategoryDto>) {
    try {
      const newCat = await this.categoryModel.create(payload);
      return newCat;
    } catch (error) {
      console.error('Kategoriya yaratishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_all() {
    try {
      const all = await this.categoryModel.findAll();
      return all;
    } catch (error) {
      console.error('Kategoriyalarni olishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async put_category(id: string, payload: Required<CategoryDto>) {
    try {
      const exists = await this.categoryModel.findOne({ where: { Id: id } });
      if (!exists) {
        throw new NotFoundException(`Kategoriya ID ${id} topilmadi`);
      }

      const updatedCat = await exists.update(payload);
      return updatedCat;
    } catch (error) {
      console.error('Kategoriyani yangilashda xatolik:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete_category(id: string) {
    try {
      const deleted = await this.categoryModel.destroy({ where: { Id: id } });

      if (!deleted) {
        throw new NotFoundException(`Kategoriya ID ${id} topilmadi`);
      }

      return { success: true, data: deleted };
    } catch (error) {
      console.error('Kategoriyani o‘chirishda xatolik:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
