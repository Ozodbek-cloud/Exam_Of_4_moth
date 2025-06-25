import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileModel } from 'src/core/entities/profiles.entities';
import { ProfilesController } from './profiles.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProfileModel])],
  providers: [ProfilesService],
  controllers: [ProfilesController]
})
export class ProfilesModule {}
