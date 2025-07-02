import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { ActiveModule } from './modules/active/active.module';



@Module({
  imports: [MainCore, ActiveModule],
})
export class AppModule {}
