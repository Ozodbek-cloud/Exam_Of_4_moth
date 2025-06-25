import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/core/entities/user.entities';
import { JwtAccessTokenModule } from 'src/common/Jwt/jwt.access.module';
import { JwtRefreshTokenModule } from 'src/common/Jwt/jwt.refresh.module';
import { MailModule } from 'src/common/mail/mail.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), JwtAccessTokenModule, JwtRefreshTokenModule, MailModule, RedisModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
