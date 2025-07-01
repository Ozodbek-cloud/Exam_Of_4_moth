import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Lang } from "src/core/types/user.types";

export class Movie_Files_Dto {

    @ApiProperty({ format: 'binary' })
    video: string

    @ApiProperty({example: '4k'})
    @IsNotEmpty()
    quality: '4k'| '240p' | '360p' | '480p' | '1080p' 

    @ApiProperty({enum: Lang, example: Lang.UZB})
    @IsEnum(Lang)
    @IsNotEmpty()
    language: Lang
}