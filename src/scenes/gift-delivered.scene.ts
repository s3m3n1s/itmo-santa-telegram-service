import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { sendUserLetterAPI } from 'api';
import { FINAL_SCENE, GIFT_DELIVERED_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import {
  sendLetterKeyboard,
  visitDeliverPlaceKeyboard,
} from 'keyboards/gift-delivered';
import { getTranslation } from 'language';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@Scene(GIFT_DELIVERED_SCENE)
export class GiftDelivered {
  currentScene: string;
  constructor() {
    this.currentScene = GIFT_DELIVERED_SCENE;
  }
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    await ctx.reply('🥳');
    this.sendLetter(ctx);
  }

  async sendLetter(@Ctx() ctx) {
    await ctx.reply(
      'Если хочешь отправить письмо получателю подарка - напиши его в ответном сообщении. Если нет - нажми на кнопку.',
      sendLetterKeyboard,
    );
  }

  @On('message')
  async onLetter(@Ctx() ctx) {
    const { id } = ctx.from;
    const { text } = ctx.update.message;

    await sendUserLetterAPI(id, text);
    await ctx.reply(
      'Отправил! Если хочешь его обновить - напиши в чат новую версию. Если нет - нажми на кнопку.',
      sendLetterKeyboard,
    );
  }

  @On('callback_query')
  async onInlineKeyboard(@Ctx() ctx) {
    const { queryType } = JSON.parse(ctx.update.callback_query.data);
    if (queryType === 'WONT_SEND_LETTER') {
      await ctx.scene.enter(FINAL_SCENE);
    }
  }
}
