import { Module } from '@nestjs/common';

import { TelegrafModule } from 'nestjs-telegraf';
import { NotificationsModule } from 'notifications/notifications.module';
import { MainModule } from 'main/main.module';

import { sessionMiddleware } from './middleware/session.middleware';

require('dotenv').config();

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'ITMO_SANTA_BOT',
      useFactory: () => ({
        token:
          process.env.MODE === 'PROD'
            ? process.env.BOT_TOKEN
            : process.env.TESTBOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [MainModule, NotificationsModule],
      }),
    }),
    MainModule,
    NotificationsModule,
  ],
})
export class AppModule {}
