import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class Movie_Files_Dto {

    @ApiProperty({format: 'binary'})
    video: string

    @ApiProperty()
    @IsNotEmpty()
    quality: ['240p',| '360p', | '480p', |'720p', |'1080p', |'4K',]

    @ApiProperty()
    @IsNotEmpty()
    language: ['uzb' | 'eng' | 'rus']
}