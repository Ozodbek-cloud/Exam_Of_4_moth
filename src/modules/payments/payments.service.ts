import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payments_Model } from 'src/core/entities/payments.entites';
import { PaymentDto } from './Dto/payment_dto';

@Injectable()
export class PaymentsService { 
    constructor (@InjectModel(Payments_Model) private paymentModel: typeof Payments_Model) {} 

    
}
