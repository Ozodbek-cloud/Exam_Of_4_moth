import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber } from 'class-validator';

export class WatchHistoryDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
  @IsUUID()
  movie_id: string;

  @ApiProperty({ example: 540 }) 
  @IsNumber()
  watched_duration: number;

  @ApiProperty({ example: 75.5 }) 
  @IsNumber()
  watched_percentage: number;
}
