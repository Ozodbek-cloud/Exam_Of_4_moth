import { IsNotEmpty, IsString } from "class-validator";



export class Movie_Files_Dto {
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @IsNotEmpty()
    file_url: string

    @IsNotEmpty()
    quality: ['240p',| '360p', | '480p', |'720p', |'1080p', |'4K',]

    @IsNotEmpty()
    langauge: ['uzb' | 'eng' | 'rus']
}