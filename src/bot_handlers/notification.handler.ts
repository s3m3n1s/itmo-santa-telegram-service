import { UseFilters } from '@nestjs/common';
import { getSantaLetterAPI, getUserBioAPI } from 'api';
import { RECEIVER_ATTACHED_SCENE } from 'app.constants';
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

    ctx.scene.enter(RECEIVER_ATTACHED_SCENE);
  }

  async onGiftDelivered(@Ctx() ctx) {
    const { id } = ctx.from;

    await ctx.reply('Подарок доставлен!');
  }

  async onGiftReceived(@Ctx() ctx) {
    const { id } = ctx.from;
    const letter = await getSantaLetterAPI(id);
    await ctx.reply(letter);
  }
  async onMyGiftReceived(@Ctx() ctx) {
    const { id } = ctx.from;
    await ctx.reply('Твой подарок доставили!');
  }
}
