import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class favouriteDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef' })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  movie_id: string;


}
