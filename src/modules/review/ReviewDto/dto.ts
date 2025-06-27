import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class ReviewDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rating: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    comment: string
}