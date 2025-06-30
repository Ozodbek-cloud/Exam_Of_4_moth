import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class MoCatDto{
    @ApiProperty({example: "iebed-sadnosdnao-dds"})
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @ApiProperty({example: "ebed-sadnosdna12-dds12"})
    @IsString()
    @IsNotEmpty()
    category_id: string
}