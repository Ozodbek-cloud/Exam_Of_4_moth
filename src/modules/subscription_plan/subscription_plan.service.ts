import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { SubscriptionDto } from './SubDto/sub.dto';
import { User_Subscriptions_Model } from 'src/core/entities/user_subscriptions.entities';
import { UserSubs } from './SubDto/userSubs_plan.dto';
import { Payments_Model } from 'src/core/entities/payments.entites';
import { Payment_Status, Status } from 'src/core/types/user.types';
import { PaymentDto } from './SubDto/payment_dto';
import { UpdatepaymentDto } from './SubDto/updated_payment';

@Injectable()
export class SubscriptionPlanService {
    constructor(@InjectModel(Subscriptions_Plans_Model) private subscriptionModel: typeof Subscriptions_Plans_Model, @InjectModel(User_Subscriptions_Model) private userSubsMol: typeof User_Subscriptions_Model, @InjectModel(Payments_Model) private paymentModel: typeof Payments_Model) { }

    async createSubs(payload: Required<SubscriptionDto>) {
        try {
            let newSubs = await this.subscriptionModel.create(payload)

            return { success: true, data: newSubs }
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('qo‘shishda xatolik yuz berdi', error.message);
        }
    }

    async createUserSubs(user_id: string, payload: UserSubs) {
        try {
            const plan = await this.subscriptionModel.findOne({
                where: { Id: payload.plan_id },
            });

            if (!plan) {
                throw new NotFoundException(`Plan not found: ${payload.plan_id}`);
            }

            const data = await this.userSubsMol.create({
                ...payload,
                user_id,
            });

            return {
                success: true,
                data: data.dataValues,
            };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('qo‘shishda xatolik yuz berdi', {
                cause: error,
                description: error.message,
            });
        }
    }




    async get_all_subs() {
        try {
            let all = await this.subscriptionModel.findAll({
                include: [{ model: User_Subscriptions_Model }]
            })
            return all
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('qo‘shishda xatolik yuz berdi', error.message);
        }
    }
    async create_payment(payload: PaymentDto) {
        try {
            if (payload.amount < 1)
                throw new BadRequestException("Amount noto'g'ri!");

            const userSubscription = await this.userSubsMol.findByPk(payload.user_subscription_id);
            if (!userSubscription)
                throw new NotFoundException("User subscription not found!");

            const subscriptionPlan = await this.subscriptionModel.findByPk(userSubscription.dataValues.plan_id);
            if (!subscriptionPlan)
                throw new NotFoundException("Subscription plan not found!");

            if (subscriptionPlan.is_active)
                throw new BadRequestException("Subscription plan is not active!");

            if (payload.amount >= subscriptionPlan.price) {
                await this.paymentModel.create({
                    ...payload,
                    status: Payment_Status.COMPLETED,
                });

                await userSubscription.update({ status: Status.ACTIVE });

                return {
                    success: true,
                    message: "To‘lov muvaffaqiyatli bajarildi!",
                };
            } else {
                await this.paymentModel.create({
                    ...payload,
                    status: Payment_Status.PENDING,
                });

                return {
                    success: true,
                    message: `Qoldiq: ${subscriptionPlan.dataValues.price- payload.amount}`,
                };
            }
        } catch (error) {
            console.error("Xatolik:", error);
            throw new InternalServerErrorException(
                "Sotib olishda qo‘shishda xatolik yuz berdi",
                { cause: error, description: error.message }
            );
        }
    }



    async update(payload: UpdatepaymentDto) {
        try {
            const payment = await this.paymentModel.findByPk(payload.payment_id)
            if (!payment) throw new NotFoundException('paymnet not found !')

            const userSubscription = await this.userSubsMol.findByPk(payment.user_subscription_id)
            if (!userSubscription) throw new NotFoundException('user Subscription not found !')

            const subscriptionPlan = await this.subscriptionModel.findByPk(userSubscription.plan_id)
            if (!subscriptionPlan) throw new NotFoundException('subscription plan not found !')

            if (subscriptionPlan.is_active) throw new BadRequestException('subscriptionPlan not activate !')

            if (payload.amount + payment.amount >= subscriptionPlan.price) {
                payment.amount += payload.amount
                userSubscription.update({ status: Status.ACTIVE })

                return { succes: true, message: 'payment succes crteated !' }
            }
            payment.amount += payload.amount
            payment.save()
        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('Review qo‘shishda xatolik yuz berdi', error.message);
        }
    }

}
