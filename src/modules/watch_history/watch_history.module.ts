import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryController } from './watch_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';
import { JwtModule } from '@nestjs/jwt';
import { Movies_Model } from 'src/core/entities/movies.entites';

@Module({
  imports: [SequelizeModule.forFeature([Watch_History_Model, Movies_Model]), JwtModule],
  providers: [WatchHistoryService],
  controllers: [WatchHistoryController]
})
export class WatchHistoryModule {}
