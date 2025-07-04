import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionDto } from './SubDto/sub.dto';
import { SubscriptionPlanService } from './subscription_plan.service';
import { Auth } from 'src/core/decorator/user.decorator';
import { UserRole } from 'src/core/types/user.types';
import { UserSubs } from './SubDto/userSubs_plan.dto';
import { PaymentDto } from './SubDto/payment_dto';
import { UpdatepaymentDto } from './SubDto/updated_payment';

@Controller('subscription-plan')
export class SubscriptionPlanController {
     constructor(private readonly subsService: SubscriptionPlanService) {}

    @ApiOperation({ summary: "Subscriptionni Create qilish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @Post('create')
    CreateSubs(@Body() payload: SubscriptionDto) {
        return this.subsService.createSubs(payload)
    }

    @Auth(UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @Post('purchase')
    createUserSubs( @Req() req :Request, @Body() payload: UserSubs) {
     return  this.subsService.createUserSubs(req['user'].id, payload)

    }
    @ApiOperation({ summary: "Subscriptionni Hammasini Get Qilish "})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @Get('all/subs')
    GetSubs() {
        return this.subsService.get_all_subs()
    }

    @ApiOperation({ summary: "paymentni sotib olish "})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @Post('payment/purchase')
    Payment(@Body() payload: PaymentDto) {
        return this.subsService.create_payment(payload)
    }

    @ApiOperation({ summary: "paymentni update qilish "})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Auth(UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN)
    @ApiBearerAuth()
    @Put('payment/complete')
    Update(@Body() payload: UpdatepaymentDto) {
        return this.subsService.update(payload)
    }
    
}
