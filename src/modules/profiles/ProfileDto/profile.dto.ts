import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProfileDto{

    @ApiProperty({
        format: "binary"
    })
    avatar?: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string

    
}