import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: 'golden_user123',
    description: 'Foydalanuvchi nomi',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SecureP@ssw0rd',
    description: 'Foydalanuvchi paroli (kamida 8 belgidan iborat)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
