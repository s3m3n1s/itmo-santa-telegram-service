import { sendUserBioAPI } from 'api';
import { RECEIVER_ATTACHED_SCENE, USER_PROFILE_SCENE } from 'app.constants';
import { instructionsKeyboard, waitKeyboard } from 'keyboards/user-profile';
import { getTranslation, lang } from 'language';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@Scene(USER_PROFILE_SCENE)
export class UserProfileScene {
  currentScene: string;
  constructor() {
    this.currentScene = USER_PROFILE_SCENE;
  }
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    await this.fillUserBio(ctx);
  }

  async fillUserBio(@Ctx() ctx) {
    const { language_code } = ctx.from;
    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'TELL_ABOUT_YOURSELF'),
    );
  }

  async waitForReceiverInstructions(@Ctx() ctx) {
    const { language_code } = ctx.from;

    await ctx.reply(
      getTranslation(language_code, this.currentScene, 'WAIT'),
      waitKeyboard(
        getTranslation(
          language_code,
          this.currentScene,
          'TELL_ABOUT_PROJECT_KEYBOARD',
        ),
        getTranslation(
          language_code,
          this.currentScene,
          'WHO_IS_MY_RECEIVER_KEYBOARD',
        ),
        getTranslation(language_code, this.currentScene, 'IDLE_KEYBOARD'),
      ),
    );
  }

  @On('callback_query')
  async onInlineKeyboard(@Ctx() ctx) {
    const { queryType } = JSON.parse(ctx.update.callback_query.data);

    if (queryType === 'FILL_PROFILE') {
      await this.fillUserBio(ctx);
    }
    if (queryType === 'WAIT_FOR_RECEIVER') {
      await this.waitForReceiverInstructions(ctx);
    }
    if (queryType === 'ABOUT_PROJECT') {
      await this.getInstructions(ctx);
    }
    if (queryType === 'IDLE') {
      await ctx.reply('👍');
    }
    if (queryType === RECEIVER_ATTACHED_SCENE) {
      await ctx.scene.enter(RECEIVER_ATTACHED_SCENE);
    }
  }

  //Пометить защитой, что уже было отправлено
  @On('message')
  async onUserBioSend(@Ctx() ctx) {
    const { id } = ctx.from;
    const { text } = ctx.update.message;
    if (text.length === 0) {
      await ctx.reply('Аноним значит. Ну ладно.');
    } else {
      await sendUserBioAPI(id, text);
      await ctx.reply('Отправил!');
    }
    await this.getInstructions(ctx);
  }

  async getInstructions(@Ctx() ctx) {
    const { language_code } = ctx.from;
    const INSTRUCTIONS = getTranslation(
      language_code,
      this.currentScene,
      'INSTRUCTIONS',
    );

    for await (const INSTRUCTION of INSTRUCTIONS) {
      await ctx.reply(INSTRUCTION);
    }

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
  }
}
