import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review_Model } from 'src/core/entities/reviews.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Review_Model]), JwtModule],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
