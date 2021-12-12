import { Body, Controller, Post } from '@nestjs/common';
import { Update } from 'nestjs-telegraf';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@Update()
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Post('/send')
  async sendNotification(@Body() data) {
    return this.notificationService.send(data.receiverId, data.message, null);
  }

  @Post('/registration')
  async onUserAuth(@Body() data) {
    return this.notificationService.onUserAuth(data);
  }

  @Post('/receiver_attached')
  async onReceiverAttach(@Body() data) {
    return this.notificationService.onReceiverAttach(data);
  }

  @Post('/gift_delivered')
  async onGiftDeliver(@Body() data) {
    return this.notificationService.onGiftDeliver(data);
  }

  @Post('/incoming_letter')
  async onIncomingLetter(@Body() data) {
    return this.notificationService.onIncomingLetter(data);
  }
}
