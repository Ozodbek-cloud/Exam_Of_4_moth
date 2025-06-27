import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription_plan.service';
import { SubscriptionPlanController } from './subscription_plan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { JwtModule } from '@nestjs/jwt';
import { User_Subscriptions_Model } from 'src/core/entities/user_subscriptions.entities';

@Module({
  imports: [SequelizeModule.forFeature([Subscriptions_Plans_Model, User_Subscriptions_Model]), JwtModule],
  providers: [SubscriptionPlanService],
  controllers: [SubscriptionPlanController]
})
export class SubscriptionPlanModule {}
