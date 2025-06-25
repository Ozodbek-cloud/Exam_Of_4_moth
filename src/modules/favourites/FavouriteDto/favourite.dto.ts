import { IsNotEmpty, IsString } from "class-validator";


export class favouriteDto{
    @IsString()
    @IsNotEmpty()
    movie_id: string

    @IsString()
    @IsNotEmpty()
    user_id: string
}