import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class MoCatDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category_id: string
}