import { Module } from '@nestjs/common';
import { RegistrationScene } from 'scenes/registration.scene';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService, RegistrationScene],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
