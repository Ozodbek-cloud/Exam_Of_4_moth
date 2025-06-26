import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class MovieDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    slug: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    release_year: string

    @ApiProperty()
    @IsNotEmpty()
    duration_minutes: string

    @ApiProperty({format: "binary"})
    poster: string

    @ApiProperty()
    @IsNotEmpty()
    rating: string

    @ApiProperty()
    @IsNotEmpty()
    subscription_type: 'free' | "premium"

    @ApiProperty()
    @IsNotEmpty()
    view_count: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    created_by : string
}