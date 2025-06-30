import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProfileDto{

    @ApiProperty({
        format: "binary"
    })
    updated_avatar?: string

    @ApiProperty({ example: "9989158478"})
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty({example: "U.S.A"})
    @IsString()
    @IsNotEmpty()
    country: string

    
}