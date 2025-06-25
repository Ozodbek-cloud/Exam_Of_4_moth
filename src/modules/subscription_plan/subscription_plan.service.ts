import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { SubscriptionDto } from './SubDto/sub.dto';
import { User_Subscriptions_Model } from 'src/core/entities/user_subscriptions.entities';

@Injectable()
export class SubscriptionPlanService {
    constructor(@InjectModel(Subscriptions_Plans_Model) private subscriptionModel: typeof Subscriptions_Plans_Model) {}

    async create_subscription(payload: Required<SubscriptionDto>) {
        let newSubs = await this.subscriptionModel.create(payload)

        return {message: "Successfully created subscription", data: newSubs}
    }

    async get_all_subs() {
     let all_subs = await this.subscriptionModel.findAll()

     return {success: true, data: all_subs}
    }

    async get_one_sub_by_id(id: string) {
        let one_Subs = await this.subscriptionModel.findOne({
            where: {
                Id: id
            }, include: [{ 
                model: User_Subscriptions_Model
            }]
        })
        return { success: true, data: one_Subs}
    }
}
