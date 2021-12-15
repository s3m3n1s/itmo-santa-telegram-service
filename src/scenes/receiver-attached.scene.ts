import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { getUserBioAPI } from 'api';
import { GIFT_DELIVERED_SCENE, RECEIVER_ATTACHED_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { TelegramUserRegistered } from 'common/guards/user-exists.guard';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import {
  receiverAttachedKeyboard,
  reminderKeyboard,
  sendLetterKeyboard,
} from 'keyboards/receiver-attached';
import { getTranslation, lang } from 'language';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@Scene(RECEIVER_ATTACHED_SCENE)
export class ReceiverAttached {
  currentScene: string;
  constructor() {
    this.currentScene = RECEIVER_ATTACHED_SCENE;
  }
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    const { language_code, id } = ctx.from;

    const letter = await getUserBioAPI(id);

    await ctx.reply(`"${letter}"`);

    const INSTRUCTIONS = getTranslation(
      language_code,
      this.currentScene,
      'INSTRUCTIONS',
    );

    for await (const INSTRUCTION of INSTRUCTIONS) {
      await ctx.reply(INSTRUCTION);
    }

    const codeButtonText = getTranslation(
      language_code,
      this.currentScene,
      'FINAL_INSTRUCTION',
    );
    const codeButtonKeyboard = receiverAttachedKeyboard(
      getTranslation(
        language_code,
        this.currentScene,
        'FINAL_INSTRUCTION_KEYBOARD',
      ),
    );

    await ctx.reply(`${codeButtonText} ${8080}`, codeButtonKeyboard);
  }

  @On('callback_query')
  async onInlineKeyboard(@Ctx() ctx) {
    const { id, language_code } = ctx.from;
    const { queryType } = JSON.parse(ctx.update.callback_query.data);

    //перенести в start
    if (queryType === 'WENT_FOR_GIFT') {
      await ctx.reply(
        getTranslation(language_code, this.currentScene, 'REMIND_ABOUT_LETTER'),
        reminderKeyboard,
      );
    }
    if (queryType === 'WILL_SEND_LETTER') {
      await ctx.reply('Отправь его ответным сообщением');
    }
    if (queryType === 'WONT_SEND_GIFT') {
      await ctx.reply('Понял принял подтвердил');
    }
    if (queryType === 'OKAY') {
      await ctx.reply('😇');
    }

    if (queryType === GIFT_DELIVERED_SCENE) {
      await ctx.scene.enter(GIFT_DELIVERED_SCENE);
    }
  }

  @On('message')
  async onLetter(@Ctx() ctx) {
    const { id, language_code } = ctx.from;
    //Проверка, что подарок был доставлен
    await ctx.reply('Сохранил');
  }

  async remindAboutLetter(@Ctx() ctx) {
    const { id, language_code } = ctx.from;
    await ctx.reply(
      'Как я и говорил ранее, ты можешь дополнить подарок digital-посланием! Участник получит твое послание, когда заберет предназначенный ему подарок.',
      sendLetterKeyboard,
    );
  }
}
