import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

  @ApiProperty({ example: 'Action' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'action' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Action movies are filled with high energy, fights, and thrilling scenes.' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
