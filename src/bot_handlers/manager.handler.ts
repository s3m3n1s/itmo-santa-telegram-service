import { UseFilters } from '@nestjs/common';
import { Ctx, InjectBot, On, Update } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import {
  BIO_SCENE,
  BOT_NAME,
  LETTER_SCENE,
  USER_PROFILE_SCENE,
} from 'app.constants';
import { Context, Telegraf } from 'telegraf';
import { NotificationHandler } from './notification.handler';
import { getTranslation } from 'language';
import { instructionsKeyboard, waitKeyboard } from 'keyboards/user-profile';
import { UserProfileScene } from 'scenes/user-profile.scene';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class ManagerHandler {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
    private readonly notificationService: NotificationHandler,
    private readonly userProfileService: UserProfileScene,
  ) {}

  @On('callback_query')
  async onKeyboardActions(@Ctx() ctx) {
    const { id } = ctx.from;
    const { queryType, action } = JSON.parse(ctx.update.callback_query.data);
    console.log(queryType, action);

    if (action === 'SCENE') {
      await this.handleSceneCallback(queryType, id, ctx);
    }
    if (action === 'SEND') {
      await this.handleSendCallback(queryType, id, ctx);
    }
    if (action === 'NOTIFY') {
      await this.handleNotificationCallback(queryType, id, ctx);
    }

    if (queryType === 'ABOUT_PROJECT') {
      await this.userProfileService.getInstructions(ctx);
    }

    if (queryType === 'WAIT_FOR_RECEIVER') {
      await this.userProfileService.waitForReceiverInstructions(ctx);
    }

    if (queryType === 'IDLE') {
      await ctx.reply('👍');
    }

    if (queryType === 'HOORAY') {
      await ctx.reply('🎉');
    }
  }

  async handleSceneCallback(sceneName: string, id: string, ctx) {
    await ctx.scene.enter(sceneName);
  }

  async handleSendCallback(queryType: string, id: string, ctx) {
    switch (queryType) {
      case 'SEND_BIO':
        await ctx.scene.enter(BIO_SCENE);
        break;
      case 'DONT_SEND_BIO':
        await this.bot.telegram.sendMessage(id, 'ok');
        break;
      case 'SEND_LETTER':
        await ctx.scene.enter(LETTER_SCENE);
        break;
      case 'DONT_SEND_LETTER':
        await this.bot.telegram.sendMessage(id, 'ok');
        break;
    }
  }

  async handleNotificationCallback(queryType: string, id: string, ctx) {
    switch (queryType) {
      case 'REGISTRATION':
        await this.notificationService.onRegistration(ctx);
        break;
      case 'RECEIVER_ATTACHED':
        await this.notificationService.onReceiverAttached(ctx);
        break;
      case 'GIFT_DELIVERED':
        await this.notificationService.onGiftDelivered(ctx);
        break;
      case 'GIFT_RECEIVED':
        await this.notificationService.onGiftReceived(ctx);
        break;
      case 'MY_GIFT_RECEIVED':
        await this.notificationService.onMyGiftReceived(ctx);
        break;
    }
  }
}
