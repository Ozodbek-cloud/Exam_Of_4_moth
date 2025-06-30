import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionDto } from './SubDto/sub.dto';
import { SubscriptionPlanService } from './subscription_plan.service';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';
import { UserSubs } from './SubDto/userSubs_plan.dto';
import { PaymentDto } from '../payments/Dto/payment_dto';

@Controller('subscription-plan')
export class SubscriptionPlanController {
     constructor(private readonly subsService: SubscriptionPlanService) {}

    @ApiOperation({ summary: "Subscriptionni Create qilish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('create')
    CreateSubs(@Body() payload: SubscriptionDto) {
        return this.subsService.createSubs(payload)
    }

    @Auth(UserRole.USER)
    @Post('purchase')
    createUserSubs( @Req() req :Request, @Body() payload: Required<UserSubs>) {
     return  this.subsService.createUserSubs(req['user'].id, payload)

    }
    @ApiOperation({ summary: "Subscriptionni Hammasini Get Qilish "})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('all/subs')
    GetSubs() {
        return this.subsService.get_all_subs()
    }

    @ApiOperation({ summary: "paymentni sotib olish "})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Get('payment/purchase')
    Payment(@Body() payload: PaymentDto) {
        return this.subsService.create_payment(payload)
    }

    
}
