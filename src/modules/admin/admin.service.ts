import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/core/entities/user.entities';
import { AdminDto } from './adminDto/admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async add_admin(payload: Required<AdminDto>) {
    try {
      const createadmin = await this.userModel.create({ ...payload, role: 'ADMIN' });
      return createadmin;
    } catch (error) {
      console.error('Admin yaratishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_all() {
    try {
      const all = await this.userModel.findAll({ where: { role: 'ADMIN' } });
      return all;
    } catch (error) {
      console.error('Adminlarni olishda xatolik:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete_admin(id: string) {
    try {
      const deleted = await this.userModel.destroy({ where: { Id: id } });

      if (!deleted) {
        throw new NotFoundException(`Admin with ID ${id} not found`);
      }

      return { message: 'Admin deleted successfully', id };
    } catch (error) {
      console.error('Adminni o‘chirishda xatolik:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
