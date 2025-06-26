import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class favouriteDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: string
}