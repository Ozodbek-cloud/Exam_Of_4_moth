import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payments_Model } from 'src/core/entities/payments.entites';

@Module({
  imports: [SequelizeModule.forFeature([Payments_Model])],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
