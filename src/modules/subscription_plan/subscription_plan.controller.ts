import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionDto } from './SubDto/sub.dto';
import { SubscriptionPlanService } from './subscription_plan.service';

@Controller('subscription-plan')
export class SubscriptionPlanController {
     constructor(private readonly subsService: SubscriptionPlanService) {}

    @ApiOperation({ summary: "Subscriptionni Create qilish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('create')
    CreateSubs(@Body() payload: SubscriptionDto) {
        return this.subsService.create_subscription(payload)
    }

    @ApiOperation({ summary: "Subscriptionni Create qilish"})
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 404, description: 'UnSuccess' })
    @Post('create')
    GetSubs() {
        return this.subsService.get_all_subs
    }
}
