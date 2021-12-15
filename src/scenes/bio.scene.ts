import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { getUserAPI, sendUserBioAPI, updateUserProgressAPI } from 'api';
import { BIO_SCENE, USER_PROFILE_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { BioGuard } from 'common/guards/bio.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import { getTranslation, lang } from 'language';

import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { getUserLanguage } from 'utils';

@UseInterceptors(ResponseTimeInterceptor)
@Scene(BIO_SCENE)
@UseFilters(TelegrafExceptionFilter)
export class BioScene {
  currentScene: string;
  constructor() {
    this.currentScene = BIO_SCENE;
  }

  @SceneEnter()
  @UseGuards(BioGuard)
  async onSceneEnter(@Ctx() ctx) {
    const { id } = ctx.from;
    const language_code = await getUserLanguage(id);
    await ctx.reply(
      getTranslation(language_code, USER_PROFILE_SCENE, 'TELL_ABOUT_YOURSELF'),
    );
  }

  @On('message')
  async sendBio(@Ctx() ctx) {
    const { id } = ctx.from;
    const language_code = await getUserLanguage(id);
    const { text } = ctx.update.message;
    const user = await getUserAPI(id);
    await sendUserBioAPI(id, text);
    await updateUserProgressAPI(id, BIO_SCENE);
    await ctx.reply(
      getTranslation(language_code, USER_PROFILE_SCENE, 'SENT_BIO'),
    );

    if (!user.bio) {
      ctx.scene.enter(USER_PROFILE_SCENE);
    }
    await ctx.scene.leave();
  }
}
