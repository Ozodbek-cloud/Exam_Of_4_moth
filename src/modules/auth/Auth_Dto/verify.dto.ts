import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerificationDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    code: number

    @ApiProperty()
    @IsString()
    password: string
}