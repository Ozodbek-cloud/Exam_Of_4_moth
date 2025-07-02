import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';

@Injectable()
export class ActiveService {
    constructor(@InjectModel(Subscriptions_Plans_Model) private subsModel: typeof Subscriptions_Plans_Model) { }

    async Activate(id: string) {
        const exists = await this.subsModel.findOne({ where: { Id: id } });
        if (!exists) throw new NotFoundException(`Subscription plan with id ${id} not found`);

        if (exists.is_active) {
            throw new BadRequestException(`Subscription plan is already active`);
        }

        await exists.update({ is_active: true });
        return { success: true, message: 'Successfully Activated' };
    }

    async DeActive(id: string) {
        const exists = await this.subsModel.findOne({ where: { Id: id } });
        if (!exists) throw new NotFoundException(`Subscription plan with id ${id} not found`);

        if (!exists.is_active) {
            throw new BadRequestException(`Subscription plan is already deactivated`);
        }

        await exists.update({ is_active: false });
        return { success: true, message: 'Successfully DeActivated' };
    }

}
