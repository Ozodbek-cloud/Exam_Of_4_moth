import { IsOptional, IsString } from "class-validator";


export class Updated_MovieDto{
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsOptional()
    @IsString()
    subscription_type?: 'free' | 'premium'
}