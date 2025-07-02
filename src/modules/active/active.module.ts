import { Module } from '@nestjs/common';
import { ActiveController } from './active.controller';
import { ActiveService } from './active.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Subscriptions_Plans_Model]), JwtModule],
  controllers: [ActiveController],
  providers: [ActiveService]
})
export class ActiveModule {}
