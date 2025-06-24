import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { DatabaseModule } from './common/config/Database.config';

@Module({
  imports: [AuthModule, UsersModule, ProfilesModule, DatabaseModule],
})
export class AppModule {}
