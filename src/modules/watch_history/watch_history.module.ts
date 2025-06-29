import { Module } from '@nestjs/common';
import { WatchHistoryService } from './watch_history.service';
import { WatchHistoryController } from './watch_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Watch_History_Model]), JwtModule],
  providers: [WatchHistoryService],
  controllers: [WatchHistoryController]
})
export class WatchHistoryModule {}
