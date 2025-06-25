import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription_plan.service';
import { SubscriptionPlanController } from './subscription_plan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';

@Module({
  imports: [SequelizeModule.forFeature([Subscriptions_Plans_Model])],
  providers: [SubscriptionPlanService],
  controllers: [SubscriptionPlanController]
})
export class SubscriptionPlanModule {}
