import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Categories_Model } from 'src/core/entities/categories.entities';
import { Favorite_Model } from 'src/core/entities/favourite.entities';
import { Movies_Categories_Model } from 'src/core/entities/movie.cat';
import { Movies_Files_Model } from 'src/core/entities/movies.files';
import { Movies_Model } from 'src/core/entities/movies.entites';
import { Payments_Model } from 'src/core/entities/payments.entites';
import { Review_Model } from 'src/core/entities/reviews.entities';
import { Subscriptions_Plans_Model } from 'src/core/entities/subscription_plans.entities';
import { User_Subscriptions_Model } from 'src/core/entities/user_subscriptions.entities';
import { UserModel } from 'src/core/entities/user.entities';
import { Watch_History_Model } from 'src/core/entities/watch_history.entities';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        models: [Categories_Model, Favorite_Model, Movies_Categories_Model, Movies_Files_Model, Movies_Model, Payments_Model
          , Review_Model, Subscriptions_Plans_Model, User_Subscriptions_Model, UserModel, Watch_History_Model
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}