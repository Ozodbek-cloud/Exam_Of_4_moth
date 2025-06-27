import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UserSubs {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    plan_id: string

    @ApiProperty()
    @IsDate()
    start_date: Date

    @IsOptional()
    @IsString()
    status?: 'active' | 'pending_payment' 

    @ApiProperty()
    @IsOptional()
    @IsDate()
    end_date?: Date

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    auto_review: boolean
}