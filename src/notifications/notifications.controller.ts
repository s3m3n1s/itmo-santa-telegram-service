import { Body, Controller, Post } from '@nestjs/common';
import { Update } from 'nestjs-telegraf';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@Update()
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Post('/send')
  async sendNotification(@Body() data) {
    return this.notificationService.sendOne(
      data.receiverId,
      data.message,
      null,
    );
  }

  @Post('/REGISTRATION')
  async onUserAuth(@Body() data) {
    console.log(data);

    return this.notificationService.onUserAuth(data);
  }

  @Post('/RECEIVER_ATTACHED')
  async onReceiverAttach(@Body() data) {
    return this.notificationService.onReceiverAttach(data);
  }

  @Post('/GIFT_DELIVERED')
  async onGiftDeliver(@Body() data) {
    return this.notificationService.onGiftDeliver(data);
  }

  @Post('/MY_GIFT_DELIVERED')
  async onMyGiftDelivered(@Body() data) {
    return this.notificationService.onMyGiftDelivered(data);
  }

  @Post('/GIFT_RECEIVED')
  async onGiftReceive(@Body() data) {
    return this.notificationService.onGiftReceive(data);
  }

  @Post('/MY_GIFT_RECEIVED')
  async onGiftTake(@Body() data) {
    return this.notificationService.onMyGiftReceive(data);
  }
}
