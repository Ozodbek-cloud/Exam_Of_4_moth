import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileModel } from 'src/core/entities/profiles.entities';
import { ProfileDto } from './ProfileDto/profile.dto';
import { UserModel } from 'src/core/entities/user.entities';
import { profile } from 'console';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(ProfileModel) private profileModel: typeof ProfileModel) { }

  async create_profile(avatar: Express.Multer.File, payload: Partial<ProfileDto>) {
    let avatarUrl = `/uploads/avatars${avatar.filename}`
    let newProfile = await this.profileModel.create({ ...payload, avatar_url: avatarUrl })
    return { sucess: true, data: newProfile }
  }

  async get_all_profile() {
    const all_profiles = await this.profileModel.findAll({
      include: [
        {
          model: UserModel,
        },
      ],
    });

    return { success: true, data: all_profiles };
  }

  async get_query_profile(country: string) {
    let profile = await this.profileModel.findAll({
      where: {
        country: country
      }, include: [{ model: UserModel }],
    })
    return { success: true, data: profile }
  }

  async get_query_by_name_profile(name: string) {
    let profile = await this.profileModel.findAll({
      where: {
        fullname: name
      }, include: [{ model: UserModel }]
    })
    return { success: true, data: profile }
  }

  async get_one_profile(id: string) {
    let profile = await this.profileModel.findOne({
      where: {
        Id: id
      }, include: [{ model: UserModel }]
    })
    return { success: true, data: profile }
  }

  async get_query_by_phone_profile(phone_number: string) {
    let profile = await this.profileModel.findAll({
      where: {
        phone: phone_number
      }, include: [{ model: UserModel }]
    })
    return { success: true, data: profile }
  }
  async updated_profile(updated_avatar: Express.Multer.File, id: string, payload: Partial<ProfileDto>) {
    const user = await this.profileModel.findOne({ where: { Id: id } });
    const updated_url = `/uploads/avatars/${updated_avatar.filename}`
    if (!user) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    const updated = await user.update({...payload, avatar_url: updated_url});
    return { success: true, data: updated };
  }

}
