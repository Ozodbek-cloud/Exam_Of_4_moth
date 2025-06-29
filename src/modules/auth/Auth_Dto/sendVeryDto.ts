import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class SendVerifyDto{
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string
}