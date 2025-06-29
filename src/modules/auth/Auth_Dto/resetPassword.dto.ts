import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 123456 })
    @IsNumber()
    code: number;

    @ApiProperty({ example: 'newStrongPassword123!' })
    @IsString()
    password: string;
}
