import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SubscriptionDto {
  @ApiProperty({ example: 'Premium Plan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 199.00 }) 
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 30 }) 
  @IsNumber()
  @IsNotEmpty()
  duration_days: number;

  @ApiProperty({
    example: ['Unlimited movies', 'HD streaming', 'No ads'],
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  feautures: string[];
}
