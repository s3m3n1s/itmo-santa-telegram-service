import { Injectable } from '@nestjs/common';
import { GreeterBotName } from 'app.constants';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { encodeMessageTypeToEmoji } from 'utils';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
  ) {}

  async sendNotification(data) {
    if (data.title) {
      this.bot.telegram.sendMessage(
        data.receiverId,
        `<b>${encodeMessageTypeToEmoji(data.type)} ${data.title}</b>\n${
          data.message
        }`,
        {
          parse_mode: 'HTML',
        },
      );
    } else {
      this.bot.telegram.sendMessage(data.receiverId, `${data.message}`, {
        parse_mode: 'HTML',
      });
    }
  }
}
