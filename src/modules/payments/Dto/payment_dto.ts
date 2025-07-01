import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsString, IsObject,
} from 'class-validator';
import { Payment_Method, Payment_Status } from 'src/core/types/user.types';
export class PaymentDto {
  @ApiProperty({ description: 'User subscription ID', format: 'uuid' })
  @IsUUID()
  @IsNotEmpty()
  user_subscription_id: string;

  @ApiProperty({ description: 'Payment amount', example: 19.99 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: Payment_Method })
  @IsEnum(Payment_Method)
  @IsNotEmpty()
  payment_method: Payment_Method;

  @ApiProperty({
    description: 'Details about the payment (e.g., card info, transaction meta)',
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  payment_details: Record<string, any>;

  @ApiProperty({ enum: Payment_Status, example: Payment_Status.PENDING})
  @IsEnum(Payment_Status)
  @IsNotEmpty()
  status: Payment_Status;


}
