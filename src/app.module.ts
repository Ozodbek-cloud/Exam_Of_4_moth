import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';



@Module({
  imports: [MainCore],
})
export class AppModule {}
