import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileModel } from 'src/core/entities/profiles.entities';
import { ProfileDto } from './ProfileDto/profile.dto';
import { UserModel } from 'src/core/entities/user.entities';
import { profile } from 'console';

@Injectable()
export class ProfilesService {
    constructor(@InjectModel(ProfileModel) private profileModel: typeof ProfileModel) {}

    async create_profile(payload: Required<ProfileDto>) {
        let newProfile = await this.profileModel.create(payload)
        return newProfile
    }

  async get_all_profile() {
    const all_profiles = await this.profileModel.findAll({
    include: [
      {
        model: UserModel,
      },
    ],
  });

  return all_profiles;
  }

  async get_query_profile(country: string) {
       let profile = await this.profileModel.findAll({
        where: {
            country: country
        }
       })
       return profile
  }

  async get_query_by_name_profile(name: string) {
       let profile = await this.profileModel.findAll({
        where: {
            fullname: name
        }
       })
       return profile
  }

  async get_one_profile(id: string) {
      let profile = await this.profileModel.findOne({
        where : {
            Id: id
        }
      })
      return profile
  }
    
  async get_query_by_phone_profile(phone_number: string) {
       let profile = await this.profileModel.findAll({
        where: {
            phone: phone_number
        }
       })
       return profile
  }
  async updated_profile(id: string, payload: Partial<ProfileDto>) {
  const user = await this.profileModel.findOne({ where: { Id: id } });

  if (!user) {
    throw new NotFoundException(`Profile with id ${id} not found`);
  }

  const updated = await user.update(payload);
  return updated;
}

}
