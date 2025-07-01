import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Subscription_type } from "src/core/types/user.types";

export class Updated_MovieDto {
  @ApiProperty({ example: 'Interstellar', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'A team of explorers travel through a wormhole in space.', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: Subscription_type, example: Subscription_type.FREE })
  @IsEnum(Subscription_type)
  @IsNotEmpty()
  subscription_type: Subscription_type;

  @ApiProperty({ format: 'binary', required: false })
  @IsOptional()
  poster?: string
}
