import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../entities/user.entities';
@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [SeedersService],
  exports: [SeedersService]
})

export class SeedersModule {}
