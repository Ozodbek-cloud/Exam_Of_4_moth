import { IsUUID, IsNumber, IsOptional } from 'class-validator';

export class WatchHistoryDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  movie_id: string;

  @IsNumber()
  watched_duration: number;

  @IsNumber()
  watched_percentage: number;
}
