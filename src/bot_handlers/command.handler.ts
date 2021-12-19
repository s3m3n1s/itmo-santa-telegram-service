import { UseFilters, UseGuards } from '@nestjs/common';
import { getUserAPI } from 'api';
import { BOT_NAME, REGISTRATION_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { AlreadyRegisteredRegistered } from 'common/guards/already-registered';
import { RegistrationExpiredGuard } from 'common/guards/registration-expired.guard';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';

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

  @UseGuards(AlreadyRegisteredRegistered)
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
    const user = await getUserAPI(id);
    await ctx.reply('Пожелания и общая информация / Information about you');
    await ctx.reply(user.bio || '<b>*no data*</b>', { parse_mode: 'HTML' });
    await ctx.reply('Твоё письмо получателю подарка / Your letter');
    await ctx.reply(user.letter || '<b>*no data*</b>', {
      parse_mode: 'HTML',
    });
  }

  @Command('mb2021')
  async markMbUsers(@Ctx() ctx) {
    const { id } = ctx.from;
    console.log(`/mb2021 ${id}`);
    await ctx.reply('ТИНТ ТИНТ ТИНТ!');
    await ctx.reply('Ваша заявка на участие в розыгрыше была принята!');
    await ctx.reply('ТИНТ ТИНТ ТИНТ!');
  }

  @Command('author')
  async getInformationAboutAuthor(@Ctx() ctx) {
    await ctx.reply(
      'Instagram: https://www.instagram.com/danyaisyourhomie/\nTelegram: @partnadem',
    );
  }
}
