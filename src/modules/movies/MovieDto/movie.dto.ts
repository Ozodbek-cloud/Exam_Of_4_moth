import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Subscription_type } from "src/core/types/user.types";

export class MovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'inception' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'A mind-bending thriller about dreams within dreams.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2010' })
  @IsNotEmpty()
  release_year: string;

  @ApiProperty({ example: '148' })
  @IsNotEmpty()
  duration_minutes: string;

  @ApiProperty({ format: 'binary' })
  poster: string;

  @ApiProperty({ example: '8.8' })
  @IsNotEmpty()
  rating: string;

  @ApiProperty({ enum: Subscription_type, example: Subscription_type.FREE })
  @IsEnum(Subscription_type)
  @IsNotEmpty()
  subscription_type: Subscription_type;

  @ApiProperty({ example: '1500000' })
  @IsNotEmpty()
  view_count: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  created_by: string;
}
