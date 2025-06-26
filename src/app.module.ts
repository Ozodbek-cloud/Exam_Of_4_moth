import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { MoviesFilesModule } from './modules/movies-files/movies-files.module';

@Module({
  imports: [MainCore],
})
export class AppModule {}
