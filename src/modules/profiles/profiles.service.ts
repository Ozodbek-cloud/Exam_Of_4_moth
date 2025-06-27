import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileDto } from './ProfileDto/profile.dto';
import { UserModel } from 'src/core/entities/user.entities';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(UserModel) private userModel: typeof UserModel) { }

  async get_all_profile() {
    const all_profiles = await this.userModel.findAll();

    return { success: true, data: all_profiles };
  }

  async get_query_profile(country: string) {
    let profile = await this.userModel.findAll({
      where: {
        country: country
      }, 
    })
    if (!profile) throw new NotFoundException(`this ${country} is not found`)
    return { success: true, data: profile }
  }

  async get_query_by_name_profile(name: string) {
    let profile = await this.userModel.findAll({
      where: {
        username: name
      }, 
    })
    if (!profile) throw new NotFoundException(`this ${name} is not found`)
    return { success: true, data: profile }
  }

  async get_one_profile(id: string) {
    
    let profile = await this.userModel.findOne({
      where: {
        Id: id
      }, 
    })
    
    if (!profile) throw new NotFoundException(`this ${id} is not found`)
    return { success: true, data: profile }
  }

  async get_query_by_phone_profile(phone_number: string) {
    let profile = await this.userModel.findAll({
      where: {
        phone: phone_number
      }, 
    })
    if (!profile) throw new NotFoundException(`this ${phone_number} is not found`)
    return { success: true, data: profile }
  }
  async updated_profile(updated_avatar: Express.Multer.File, id: string, payload: Partial<ProfileDto>) {
    const user = await this.userModel.findOne({ where: { Id: id } });
    const updated_url = `/uploads/avatars/${updated_avatar.filename}`
    if (!user) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    const updated = await user.update({...payload, avatar_url: updated_url});
    return { success: true, data: updated };
  }

}
