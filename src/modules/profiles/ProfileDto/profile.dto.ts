import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProfileDto{

    @ApiProperty({
        format: "binary"
    })
    updated_avatar?: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string

    
}