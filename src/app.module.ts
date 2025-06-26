import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { MoviesFilesModule } from './modules/movies-files/movies-files.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MoviesCategoryModule } from './modules/movies-category/movies-category.module';

@Module({
  imports: [MainCore, CategoriesModule, MoviesCategoryModule],
})
export class AppModule {}
