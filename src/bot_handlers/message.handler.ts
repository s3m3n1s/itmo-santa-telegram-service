import { UseFilters, UseGuards } from '@nestjs/common';
import { Ctx, InjectBot, On, Update } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { BOT_NAME } from 'app.constants';
import { Context, Telegraf } from 'telegraf';
import { MessageGuard } from 'common/guards/message.guard';
import { sendUserBioAPI, sendUserLetterAPI } from 'api';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';

@Update()
@UseFilters(TelegrafExceptionFilter)
@UseGuards(TelegramUserRegistered)
export class MessageHandler {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
  ) {}

  @On('message')
  @UseGuards(MessageGuard)
  async sendMessage(@Ctx() ctx) {
    if (!ctx.update.callback_query) return;

    const { id } = ctx.from;
    const message = ctx.update.message.text;
    console.log(`${id} написал ${message}`);

    const { queryType, action } = JSON.parse(ctx.update.callback_query.data);

    if (action === 'SEND') {
      this.handleSendCallback(queryType, id, message);
    }
  }

  async handleSendCallback(queryType: string, id: string, message: string) {
    switch (queryType) {
      case 'SEND_BIO':
        await sendUserBioAPI(id, message);
        break;
      case 'DONT_SEND_BIO':
        await this.bot.telegram.sendMessage(id, 'ok');
        break;
      case 'SEND_LETTER':
        await sendUserLetterAPI(id, message);
        break;
      case 'DONT_SEND_LETTER':
        await this.bot.telegram.sendMessage(id, 'ok');
        break;
    }
  }
}
