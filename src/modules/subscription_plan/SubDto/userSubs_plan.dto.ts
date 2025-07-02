import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserSubs {
  @ApiProperty({ example: 'abc123-plan-id' })
  @IsString()
  @IsNotEmpty()
  plan_id: string;

  @ApiProperty({ example: '2025-07-01T00:00:00.000Z' })
  @IsString()
  start_date: Date;

  @ApiProperty({ example: 'active', required: false })
  @IsOptional()
  @IsString()
  status?: 'active' | 'pending_payment';

  @ApiProperty({ example: '2025-08-01T00:00:00.000Z', required: false })
  @IsString()
  end_date: Date;


  @ApiProperty({ example: true })
  @IsBoolean()
  @Type(() => Boolean)
  auto_renew: boolean;

}
