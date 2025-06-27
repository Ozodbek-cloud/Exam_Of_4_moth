import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { ProfilesModule } from "src/modules/profiles/profiles.module";
import { DatabaseModule } from "./Database.config";
import { RedisModule } from "@nestjs-modules/ioredis";
import { MailModule } from "../mail/mail.module";
import { SubscriptionPlanModule } from "src/modules/subscription_plan/subscription_plan.module";
import { MoviesModule } from "src/modules/movies/movies.module";
import { FavouritesModule } from "src/modules/favourites/favourites.module";
import { MoviesFilesModule } from "src/modules/movies-files/movies-files.module";
import { CategoriesModule } from "src/modules/categories/categories.module";
import { MoviesCategoryModule } from "src/modules/movies-category/movies-category.module";
import { AdminModule } from "src/modules/admin/admin.module";
import { ReviewModule } from "src/modules/review/review.module";

@Module({
    imports: [AuthModule, ProfilesModule, DatabaseModule, RedisModule, MailModule, SubscriptionPlanModule, MoviesModule, FavouritesModule, MoviesFilesModule,  CategoriesModule, MoviesCategoryModule, AdminModule, ReviewModule]
})
export class MainCore {}