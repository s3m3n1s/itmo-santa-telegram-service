import { UseFilters, UseInterceptors } from '@nestjs/common';
import { authUserAPI } from 'api';
import { REGISTRATION_SCENE, USER_PROFILE_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import {
  aboutLanguageKeyboard,
  authLinkKeyboard,
} from 'keyboards/registration';
import { getTranslation } from 'language';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { generateAuthLink } from 'utils';

@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@Scene(REGISTRATION_SCENE)
export class RegistrationScene {
  currentScene: string;
  constructor() {
    this.currentScene = REGISTRATION_SCENE;
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    const { language_code } = ctx.from;
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'START'),
      aboutLanguageKeyboard({
        text: getTranslation(
          language_code,
          this.currentScene,
          'START_KEYBOARD',
        ),
      }),
    );
  }

  async authorization(@Ctx() ctx) {
    const { id, language_code, first_name, last_name, username } = ctx.from;
    const token = await generateAuthLink({
      tgId: id,
      language_code,
    });
    const url = `${process.env.LINK_TO_REGISTRATION}&state=${id}`;
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'AUTH_PHRASE'),
      authLinkKeyboard({
        url,
        text: getTranslation(
          language_code,
          this.currentScene,
          'AUTH_PHRASE_KEYBOARD',
        ),
      }),
    );
  }

  @On('callback_query')
  async onInlineKeyboard(@Ctx() ctx) {
    const { queryType } = JSON.parse(ctx.update.callback_query.data);

    if (queryType === USER_PROFILE_SCENE) {
      await ctx.scene.enter(USER_PROFILE_SCENE);
    }
    if (queryType === 'ABOUT_LANGUAGE') {
      await this.authorization(ctx);
    }
  }
}
