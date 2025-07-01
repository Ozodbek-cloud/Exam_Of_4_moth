import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class ReviewDto{

    @ApiProperty({example: "4.5"})
    @IsNumber()
    @IsNotEmpty()
    rating: number

    @ApiProperty({example: "This good"})
    @IsString()
    @IsNotEmpty()
    comment: string
}