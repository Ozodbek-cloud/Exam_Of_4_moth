import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class UpdatepaymentDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    payment_id: string

    @IsNumber()
    @IsNotEmpty()
    amount: number
}
