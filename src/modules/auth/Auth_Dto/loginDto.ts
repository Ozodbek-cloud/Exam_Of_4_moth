import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty({example: 'John Doe'})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({example: 'dfibfwnefefwobfilnewfob'})
    @IsString()
    @IsNotEmpty()
    password: string
}