import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsUpdate } from './notifications.update';

@Module({
  providers: [NotificationsUpdate, NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
