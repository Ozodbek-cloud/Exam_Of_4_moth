import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/core/entities/user.entities';
import { AdminDto } from './adminDto/admin.dto';
import { JwtAccessToken, JWtRefreshToken } from 'src/common/utils/jwt-utils';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload{
        id: number,
        role: string
}

@Injectable()
export class AdminService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel, private jwtService: JwtService) {}
   
  private async generateToken(payload: JwtPayload, accessTokenOnly = false) {
      const accessToken = await this.jwtService.signAsync(payload, JwtAccessToken);
      if (accessTokenOnly) {
        return { accessToken };
      }
  
      const refreshToken = await this.jwtService.signAsync(
        { id: payload.id },
        JWtRefreshToken
      );
  
      return { accessToken, refreshToken };
  }
  async add_admin(payload: Required<AdminDto>) {
    try {
      const createadmin = await this.userModel.create({ ...payload, role: 'ADMIN' });
      const token =await this.generateToken({id: createadmin.dataValues.Id, role: createadmin.dataValues.role})
      return {data: createadmin, token: token};
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
