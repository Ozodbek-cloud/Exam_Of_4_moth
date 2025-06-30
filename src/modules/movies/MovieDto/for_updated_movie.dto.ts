import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class Updated_MovieDto {
  @ApiProperty({ example: 'Interstellar', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'A team of explorers travel through a wormhole in space.', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'free', required: false })
  @IsString()
  @IsOptional()
  subscription_type?: 'free' | 'premium';

  @ApiProperty({format: 'binary', required: false})
  @IsOptional()
  poster?: string
}
