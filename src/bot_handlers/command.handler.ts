import { UseFilters, UseGuards } from '@nestjs/common';
import { getUserAPI, getUserBioAPI } from 'api';
import { BOT_NAME, REGISTRATION_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { RegistrationExpiredGuard } from 'common/guards/registration-expired.guard';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';

import { authLinkKeyboard } from 'keyboards/registration';
import { Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
@UseGuards(RegistrationExpiredGuard)
@UseFilters(TelegrafExceptionFilter)
export class CommandHandler {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
  ) {}
  @Start()
  async startBot(@Ctx() ctx) {
    await ctx.scene.enter(REGISTRATION_SCENE);
  }

  @UseGuards(TelegramUserRegistered)
  @Command('secret')
  async playGame(@Ctx() ctx) {
    const { id } = ctx.from;
    await ctx.reply(
      'Если выпадёт чётное - отчислят в 2022 году, нечетное - не отчислят.',
    );
    await this.bot.telegram.sendDice(id);
  }

  @UseGuards(TelegramUserRegistered)
  @Command('me')
  async getInfoAboutUser(@Ctx() ctx) {
    const { id } = ctx.from;
    await ctx.reply('Вот что я знаю о тебе:');
    const user = await getUserAPI(id);
    await ctx.reply('Пожелания и общая информация:');
    await ctx.reply(user.bio || '<b>*Отсутствует*</b>', { parse_mode: 'HTML' });
    await ctx.reply('Твоё письмо получателю подарка:');
    await ctx.reply(user.letter || '<b>*Отсутствует*</b>', {
      parse_mode: 'HTML',
    });
  }
}
