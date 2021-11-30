import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Command, Update } from 'nestjs-telegraf';
import { NotificationsService } from './notifications.service';
import { NotificationsUpdate } from './notifications.update';

@Controller('notifications')
@Update()
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Post('/send')
  async sendNotification(@Body() data) {
    return this.notificationService.sendNotification(data);
  }
}
