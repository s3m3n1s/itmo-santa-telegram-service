import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { sendUserBioAPI, sendUserLetterAPI } from 'api';
import { FINAL_SCENE, LETTER_SCENE, USER_PROFILE_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { LetterGuard } from 'common/guards/letter.guard';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import { getTranslation } from 'language';

import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@Scene(LETTER_SCENE)
@UseFilters(TelegrafExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
@UseGuards(TelegramUserRegistered)
export class LetterScene {
  currentScene: string;
  constructor() {
    this.currentScene = USER_PROFILE_SCENE;
  }

  @UseGuards(LetterGuard)
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    this.fillUserBio(ctx);
  }

  async fillUserBio(@Ctx() ctx) {
    const { language_code } = ctx.from;
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'TELL_ABOUT_YOURSELF'),
    );
  }

  @On('message')
  async sendBio(@Ctx() ctx) {
    const { id } = ctx.from;
    const { text } = ctx.update.message;
    await sendUserLetterAPI(id, text);
    await ctx.reply('Отправил!');
    await ctx.scene.leave();
    await ctx.scene.enter(FINAL_SCENE);
  }
}
