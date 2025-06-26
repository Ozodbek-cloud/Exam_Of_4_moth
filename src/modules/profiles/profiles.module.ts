import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesController } from './profiles.controller';
import { UserModel } from 'src/core/entities/user.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), JwtModule],
  providers: [ProfilesService],
  controllers: [ProfilesController]
})
export class ProfilesModule {}
