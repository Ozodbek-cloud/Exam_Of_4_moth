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

@Module({
    imports: [AuthModule, ProfilesModule, DatabaseModule, RedisModule, MailModule, SubscriptionPlanModule, MoviesModule, FavouritesModule, MoviesFilesModule]
})
export class MainCore {}