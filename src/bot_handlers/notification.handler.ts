import { UseFilters } from '@nestjs/common';
import { getUserBioAPI } from 'api';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { Ctx, Update } from 'nestjs-telegraf';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class NotificationHandler {
  async onRegistration(@Ctx() ctx) {
    const { id } = ctx.from;

    await ctx.reply('auth');
  }
  async onReceiverAttached(@Ctx() ctx) {
    const { id } = ctx.from;
    const userBio = await getUserBioAPI(id);

    await ctx.reply(userBio);
  }
  async onGiftDelivered(@Ctx() ctx) {
    const { id } = ctx.from;

    await ctx.reply('Подарок доставлен!');
  }

  async onGiftReceived(@Ctx() ctx) {
    const { id } = ctx.from;

    await ctx.reply('Смотри подарок и читай письмо!!');
  }
  async onMyGiftReceived(@Ctx() ctx) {
    const { id } = ctx.from;
    await ctx.reply('Твой подарок доставили!');
  }
}
