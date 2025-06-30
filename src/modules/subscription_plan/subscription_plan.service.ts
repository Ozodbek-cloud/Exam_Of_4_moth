import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { SubscriptionDto } from './SubDto/sub.dto';
import { User_Subscriptions_Model } from 'src/core/entities/user_subscriptions.entities';
import { UserSubs } from './SubDto/userSubs_plan.dto';
import { Payments_Model } from 'src/core/entities/payments.entites';
import { Payment_Status, Status } from 'src/core/types/user.types';
import { PaymentDto } from '../payments/Dto/payment_dto';
import { UpdatepaymentDto } from '../payments/Dto/updated_payment';

@Injectable()
export class SubscriptionPlanService {
    constructor(@InjectModel(Subscriptions_Plans_Model) private subscriptionModel: typeof Subscriptions_Plans_Model, @InjectModel(User_Subscriptions_Model) private userSubsMol: typeof User_Subscriptions_Model, @InjectModel(Payments_Model) private paymentModel: typeof Payments_Model) {}
    
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
    
    async get_all_subs() {
        let all = await this.subscriptionModel.findAll({
            include: [{model: User_Subscriptions_Model}]
        })
        return all
    }
    async create_payment(payload: Required<PaymentDto>) {
        if(payload.amount < 1) throw new BadRequestException('amount notog\'ri  !!!')

        const userSubscription = await this.userSubsMol.findByPk(payload.user_subscription_id)
        if(!userSubscription) throw new NotFoundException('user Subscription not found !')

        const sunscriptionPlan = await this.subscriptionModel.findByPk(userSubscription.dataValues.plan_id)
        if(!sunscriptionPlan) throw new NotFoundException('subscrip[tion plan not found !')

        if(sunscriptionPlan.is_active) throw new BadRequestException('subscriptionPlan not activate !')

        if(payload.amount >= sunscriptionPlan.price) {

            await this.paymentModel.create({...payload, status: Payment_Status.COMPLETED})
            userSubscription.update({status: Status.ACTIVE})

            return {succes: true, message: 'payment succes crteated !'}
        }
        
        payload.amount < sunscriptionPlan.price
        await this.paymentModel.create({...payload, status: Payment_Status.COMPLETED})
        return {succes: true, message: `qoldiq ${sunscriptionPlan.price - payload.amount}`}
    
    }


    async update (payload: UpdatepaymentDto) {
        const payment = await this.paymentModel.findByPk(payload.payment_id)
        if(!payment) throw new NotFoundException('paymnet not found !')
        
        const userSubscription = await this.userSubsMol.findByPk(payment.user_subscription_id)
        if(!userSubscription) throw new NotFoundException('user Subscription not found !')

        const subscriptionPlan = await this.subscriptionModel.findByPk(userSubscription.plan_id)
        if(!subscriptionPlan) throw new NotFoundException('subscription plan not found !')
        
        if(subscriptionPlan.is_active) throw new BadRequestException('subscriptionPlan not activate !')
        
        if(payload.amount + payment.amount >= subscriptionPlan.price) {
            payment.amount += payload.amount
            userSubscription.update({status: Status.ACTIVE})

            return {succes: true, message: 'payment succes crteated !'}
        }
        payment.amount += payload.amount
        payment.save()
    }
    
}
