import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"


export class MovieQuery {
    @IsString()
    @IsOptional()
    category?: string

    @IsString()
    @IsOptional()
    search?: string

    @IsString()
    @IsOptional()
    subscription_type?: 'free' | 'premium'

    @Type(() => Number)
    @IsOptional()
    limit?: number

    @Type(() => Number)
    @IsOptional()
    page?: number
}