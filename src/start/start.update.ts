import { UseFilters } from '@nestjs/common';
import { Action, Command, Ctx, Help, On, Start, Update } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import {
  GIFT_DELIVERED_SCENE,
  RECEIVER_ATTACHED_SCENE,
  REGISTRATION_SCENE,
  USER_PROFILE_SCENE,
} from 'app.constants';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class StartUpdate {
  @Start()
  async start(@Ctx() ctx) {
    await ctx.scene.enter(REGISTRATION_SCENE);
  }

  @Command('debug')
  async debug(@Ctx() ctx) {
    const { text } = ctx.update.message;
    const command = text.split(' ')[1];
    const arg = text.split(' ')[2];
    await ctx.reply(`${command} ${arg}`);
    if (command === 'scene') {
      await this.handleSceneSelect(ctx, arg);
    }
  }

  @On('callback_query')
  async onMessage(@Ctx() ctx) {
    const { queryType } = JSON.parse(ctx.update.callback_query.data);

    if (queryType === 'GET_RECEIVER_BIO') {
      ctx.scene.enter(RECEIVER_ATTACHED_SCENE);
    }
  }

  async handleSceneSelect(@Ctx() ctx, scene: string) {
    switch (scene) {
      case REGISTRATION_SCENE:
        await ctx.scene.enter(REGISTRATION_SCENE);
        break;
      case USER_PROFILE_SCENE:
        await ctx.scene.enter(USER_PROFILE_SCENE);
        break;
      case RECEIVER_ATTACHED_SCENE:
        await ctx.scene.enter(RECEIVER_ATTACHED_SCENE);
        break;
      case GIFT_DELIVERED_SCENE:
        await ctx.scene.enter(GIFT_DELIVERED_SCENE);
        break;
      default:
        await ctx.reply(scene + ' сцены нет');
        break;
    }
  }

  @Help()
  async help(@Ctx() ctx) {
    await ctx.reply('HELP инструкция');
  }
}
