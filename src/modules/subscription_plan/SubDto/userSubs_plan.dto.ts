import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserSubs {
  @ApiProperty({ example: 'abc123-plan-id' })
  @IsString()
  @IsNotEmpty()
  plan_id: string;

  @ApiProperty({ example: '2025-07-01T00:00:00.000Z' })
  @IsDate()
  start_date: Date;

  @ApiProperty({ example: 'active', required: false })
  @IsOptional()
  @IsString()
  status?: 'active' | 'pending_payment';

  @ApiProperty({ example: '2025-08-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDate()
  end_date?: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  auto_review: boolean;
}
