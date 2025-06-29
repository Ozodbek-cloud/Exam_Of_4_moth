import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { WatchHistoryModule } from './modules/watch_history/watch_history.module';


@Module({
  imports: [MainCore, WatchHistoryModule],
})
export class AppModule {}
