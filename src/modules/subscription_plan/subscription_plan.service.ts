import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { SubscriptionDto } from './SubDto/sub.dto';
import { User_Subscriptions_Model } from 'src/core/entities/user_subscriptions.entities';
import { UserSubs } from './SubDto/userSubs_plan.dto';

@Injectable()
export class SubscriptionPlanService {
    constructor(@InjectModel(Subscriptions_Plans_Model) private subscriptionModel: typeof Subscriptions_Plans_Model, @InjectModel(User_Subscriptions_Model) private userSubsMol: typeof User_Subscriptions_Model) {}
    
    async createSubs(payload: Required<SubscriptionDto>) {
        let newSubs = await this.subscriptionModel.create(payload)

        return { success: true, data: newSubs}
    }
    async createUserSubs( user_id : string, payload: Required<UserSubs>) {
        let plan = await this.subscriptionModel.findOne({
            where: {Id: payload.plan_id}
        })

        let date = new Date()
        date.setDate(date.getTime() + plan!.duration_days * 24 * 60 * 1000)
        if (!plan) throw new NotFoundException(`this ${payload.plan_id} is not found`)
        let data = await  this.userSubsMol.create({...payload, user_id, end_date: date})

        return {
            success:true,
            data: data.dataValues,

        }
    }

    
    
}
