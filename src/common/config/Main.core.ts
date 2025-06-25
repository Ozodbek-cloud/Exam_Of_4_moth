import { Module } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { ProfilesModule } from "src/modules/profiles/profiles.module";
import { UsersModule } from "src/modules/users/users.module";
import { DatabaseModule } from "./Database.config";
import { RedisModule } from "@nestjs-modules/ioredis";
import { MailModule } from "../mail/mail.module";

@Module({
    imports: [AuthModule, ProfilesModule, UsersModule, DatabaseModule, RedisModule, MailModule]
})
export class MainCore {}