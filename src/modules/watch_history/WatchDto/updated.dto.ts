import { IsNotEmpty, IsNumber } from "class-validator";



export class UpdateWatchHistoryDto{
    @IsNumber()
    @IsNotEmpty()
    watched_durations: number

    @IsNumber()
    @IsNotEmpty()
    watched_persentage: number
}