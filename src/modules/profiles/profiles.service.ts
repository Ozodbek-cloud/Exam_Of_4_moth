import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileDto } from './ProfileDto/profile.dto';
import { UserModel } from 'src/core/entities/user.entities';
import * as path from 'path';
import { deleteMovieFile } from 'src/common/utils/delere-utils';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) {}

  async get_all_profile() {
    try {
      const all_profiles = await this.userModel.findAll();
      return { success: true, data: all_profiles };
    } catch (error) {
      console.error('get_all_profile error:', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_query_profile(country: string) {
    try {
      const profile = await this.userModel.findAll({ where: { country } });
      if (!profile) throw new NotFoundException(`this ${country} is not found`);
      return { success: true, data: profile };
    } catch (error) {
      console.error('get_query_profile error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_query_by_name_profile(name: string) {
    try {
      const profile = await this.userModel.findAll({ where: { username: name } });
      if (!profile) throw new NotFoundException(`this ${name} is not found`);
      return { success: true, data: profile };
    } catch (error) {
      console.error('get_query_by_name_profile error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_one_profile(id: string) {
    try {
      const profile = await this.userModel.findOne({ where: { Id: id } });
      if (!profile) throw new NotFoundException(`this ${id} is not found`);
      return { success: true, data: profile };
    } catch (error) {
      console.error('get_one_profile error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async get_query_by_phone_profile(phone_number: string) {
    try {
      const profile = await this.userModel.findAll({ where: { phone: phone_number } });
      if (!profile) throw new NotFoundException(`this ${phone_number} is not found`);
      return { success: true, data: profile };
    } catch (error) {
      console.error('get_query_by_phone_profile error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async updated_profile(updated_avatar: Express.Multer.File, id: string, payload: Partial<ProfileDto>) {
  try {
    const user = await this.userModel.findOne({ where: { Id: id } });
    const updated_url = `/uploads/avatars/${updated_avatar.filename}`;

    if (!user) throw new NotFoundException(`Profile with id ${id} not found`);

    if (user.dataValues.avatar_url && user.dataValues.avatar_url !== updated_avatar.filename) {
      const oldPath = path.resolve('uploads/avatars', user.dataValues.avatar_url);
      deleteMovieFile(oldPath);
    }

    const updated = await user.update({ ...payload, avatar_url: updated_url });
    return { success: true, data: updated };
  } catch (error) {
    console.error('updated_profile error:', error);
    if (error instanceof NotFoundException) throw error;
    throw new InternalServerErrorException(error.message);
  }
}

}
