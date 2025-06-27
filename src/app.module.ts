import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { MoviesFilesModule } from './modules/movies-files/movies-files.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MoviesCategoryModule } from './modules/movies-category/movies-category.module';
import { AdminModule } from './modules/admin/admin.module';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [MainCore, CategoriesModule, MoviesCategoryModule, AdminModule, ReviewModule],
})
export class AppModule {}
