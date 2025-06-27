import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/entities/user.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), JwtModule],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
