import { Module } from '@nestjs/common';
import { MainCore } from './common/config/Main.core';
import { SubscriptionPlanModule } from './modules/subscription_plan/subscription_plan.module';
import { MoviesModule } from './modules/movies/movies.module';
import { FavouritesModule } from './modules/favourites/favourites.module';

@Module({
  imports: [MainCore, SubscriptionPlanModule, MoviesModule, FavouritesModule],
})
export class AppModule {}
