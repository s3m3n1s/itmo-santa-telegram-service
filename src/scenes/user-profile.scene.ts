import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { getUserAPI, sendUserBioAPI } from 'api';
import {
  BIO_SCENE,
  LETTER_SCENE,
  RECEIVER_ATTACHED_SCENE,
  USER_PROFILE_SCENE,
} from 'app.constants';
import { ManagerHandler } from 'bot_handlers/manager.handler';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import { instructionsKeyboard, waitKeyboard } from 'keyboards/user-profile';
import { getTranslation, lang } from 'language';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@UseGuards(TelegramUserRegistered)
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@Scene(USER_PROFILE_SCENE)
export class UserProfileScene {
  currentScene: string;
  constructor() {
    this.currentScene = USER_PROFILE_SCENE;
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    const { id } = ctx.from;
    const user = await getUserAPI(id);

    console.log(`Entered ${this.currentScene}`);

    if (user?.bio) {
      this.getInstructions(ctx);
    } else {
      await ctx.scene.enter(BIO_SCENE);
    }
  }

  async fillUserBio(@Ctx() ctx) {
    const { language_code } = ctx.from;
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'TELL_ABOUT_YOURSELF'),
    );
  }

  async waitForReceiverInstructions(@Ctx() ctx) {
    const { language_code } = ctx.from;
    const currentScene = USER_PROFILE_SCENE;
    await ctx.reply(
      getTranslation(language_code, currentScene, 'WAIT'),
      waitKeyboard(
        getTranslation(
          language_code,
          currentScene,
          'TELL_ABOUT_PROJECT_KEYBOARD',
        ),
        getTranslation(
          language_code,
          currentScene,
          'WHO_IS_MY_RECEIVER_KEYBOARD',
        ),
        getTranslation(language_code, currentScene, 'IDLE_KEYBOARD'),
      ),
    );
  }

  sendTimedMessage = async (message, ctx) => {
    setTimeout(async () => {
      await ctx.reply(message);
    }, 2000);
  };

  async getInstructions(@Ctx() ctx) {
    const currentScene = USER_PROFILE_SCENE;
    const { language_code } = ctx.from;
    const INSTRUCTIONS = getTranslation(
      language_code,
      currentScene,
      'INSTRUCTIONS',
    );

    const len = INSTRUCTIONS.length;

    await ctx.reply(INSTRUCTIONS[0]);
    let pointer = 1;
    const interval = setInterval(async () => {
      await ctx.reply(INSTRUCTIONS[pointer]);
      pointer++;

      if (pointer === len) {
        await this.sendFinalInstruction(ctx, language_code);
        clearInterval(interval);
      }
    }, 2000);
  }

  sendFinalInstruction = async (ctx, language_code) => {
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'FINAL_INSTRUCTION'),
      instructionsKeyboard(
        getTranslation(
          language_code,
          this.currentScene,
          'FINAL_INSTRUCTION_KEYBOARD',
        ),
      ),
    );
  };
}
