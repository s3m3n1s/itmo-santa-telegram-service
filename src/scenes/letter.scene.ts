import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { sendUserBioAPI, sendUserLetterAPI } from 'api';
import {
  FINAL_SCENE,
  GIFT_DELIVERED_SCENE,
  LETTER_SCENE,
  USER_PROFILE_SCENE,
} from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { LetterGuard } from 'common/guards/letter.guard';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import { getTranslation } from 'language';

import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { getUserLanguage } from 'utils';

@Scene(LETTER_SCENE)
@UseFilters(TelegrafExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
@UseGuards(TelegramUserRegistered)
export class LetterScene {
  currentScene: string;
  constructor() {
    this.currentScene = GIFT_DELIVERED_SCENE;
  }

  @UseGuards(LetterGuard)
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    const { id } = ctx.from;
    console.log(id, ' entered ', LETTER_SCENE);

    this.fillUserBio(ctx);
  }

  async fillUserBio(@Ctx() ctx) {
    const { id } = ctx.from;
    const language_code = await getUserLanguage(id);
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'SEND_LETTER'),
    );
  }

  @On('message')
  async sendBio(@Ctx() ctx) {
    const { id } = ctx.from;
    const language_code = await getUserLanguage(id);
    const { text } = ctx.update.message;
    await sendUserLetterAPI(id, text);
    await ctx.reply(
      getTranslation(language_code, USER_PROFILE_SCENE, 'SENT_BIO'),
    );
    await ctx.scene.leave();
  }
}
