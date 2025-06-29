import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class Movie_Files_Dto {

    @ApiProperty({format: 'binary'})
    video: string

    @ApiProperty()
    @IsNotEmpty()
    quality: ["Q240" | 'Q360' | 'Q480', | 'Q720', | 'Q1080', | 'Q4K']

    @ApiProperty()
    @IsNotEmpty()
    language: ['uzb' | 'eng' | 'rus']
}