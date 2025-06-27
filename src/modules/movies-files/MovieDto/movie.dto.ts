import { IsNotEmpty, IsString } from "class-validator";



export class Movie_Files_Dto {


    @IsNotEmpty()
    quality: ['240p',| '360p', | '480p', |'720p', |'1080p', |'4K',]

    @IsNotEmpty()
    language: ['uzb' | 'eng' | 'rus']
}