import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { WatchHistoryModule } from './modules/watch_history/watch_history.module';
import { SeedersModule } from './core/seeders/seeders.module';
import { PaymentsModule } from './modules/payments/payments.module';


@Module({
  imports: [MainCore, WatchHistoryModule, SeedersModule, PaymentsModule],
})
export class AppModule {}
