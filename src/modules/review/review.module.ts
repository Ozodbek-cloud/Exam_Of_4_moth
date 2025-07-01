import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review_Model } from 'src/core/entities/reviews.entities';
import { JwtModule } from '@nestjs/jwt';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Module({
  imports: [SequelizeModule.forFeature([Review_Model, Movies_Model]), JwtModule],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
