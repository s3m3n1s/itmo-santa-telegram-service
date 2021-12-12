import { Module } from '@nestjs/common';
import { GiftsModule } from 'gifts/gifts.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { NotificationsModule } from 'notifications/notifications.module';
import { StartModule } from 'start/start.module';
import { sessionMiddleware } from './middleware/session.middleware';

require('dotenv').config();

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'ITMO_SANTA_BOT',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [sessionMiddleware],
        include: [GiftsModule, StartModule, NotificationsModule],
      }),
    }),
    StartModule,
    NotificationsModule,
  ],
})
export class AppModule {}
