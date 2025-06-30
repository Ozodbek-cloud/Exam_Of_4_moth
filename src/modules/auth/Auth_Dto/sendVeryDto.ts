import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class SendVerifyDto{
    @ApiProperty({ example: "exaple@gmail.com"})
    @IsString()
    @IsEmail()
    email: string
}