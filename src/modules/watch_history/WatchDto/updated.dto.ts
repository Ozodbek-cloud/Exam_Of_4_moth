import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";



export class UpdateWatchHistoryDto{
    @ApiProperty({example: "102"})
    @IsNumber()
    @IsNotEmpty()
    watched_durations: number

    @ApiProperty({example: "10.5"})
    @IsNumber()
    @IsNotEmpty()
    watched_persentage: number
}