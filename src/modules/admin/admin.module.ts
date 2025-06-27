import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/entities/user.entities';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
