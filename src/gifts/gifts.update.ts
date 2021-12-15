import { UseFilters, UseInterceptors } from '@nestjs/common';
import { Command, InjectBot, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { GiftsService } from './gifts.service';
import { BOT_NAME } from 'app.constants';
import { translateDeliverStatus } from 'utils';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class GiftsUpdate {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
    private readonly giftsService: GiftsService,
  ) {}

  @Command('gifts')
  async getUserGifts(ctx) {
    const { id: userId } = ctx.from;
    const gifts = await this.giftsService.getUserGifts(userId);

    let i = 1;
    for await (const gift of gifts) {
      const date = new Date(gift.updatedAt).toLocaleDateString();
      const time = new Date(gift.updatedAt).toLocaleTimeString();
      await this.bot.telegram.sendMessage(
        userId,
        `🎁 Подарок #${i++}\nСтатус: <b>${
          gift.status ? translateDeliverStatus(gift.status) : 'Не установлен'
        }</b>\nПоследнее обновление статуса: <b>${date} ${time}</b>`,
        {
          parse_mode: 'HTML',
        },
      );
    }
  }

  @Command('/put')
  async putGift(ctx) {
    const giftCode = ctx.update.message.text.split(' ')[1];
    if (giftCode.length !== 10) {
      return 'Код подарка неверный!';
    }

    return this.giftsService.putGift(giftCode);
  }

  @Command('/get')
  async getGift(ctx) {
    const giftCode = ctx.update.message.text.split(' ')[1];
    if (giftCode.length !== 10) {
      return 'Код подарка неверный!';
    }

    return this.giftsService.getGift(giftCode);
  }
}
