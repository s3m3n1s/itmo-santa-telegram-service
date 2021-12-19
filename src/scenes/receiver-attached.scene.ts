import { UseFilters, UseInterceptors } from '@nestjs/common';
import { getUserBioAPI, getUserGiftAPI } from 'api';
import { RECEIVER_ATTACHED_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';
import {
  receiverAttachedKeyboard,
  sendLetterKeyboard,
} from 'keyboards/receiver-attached';
import { getTranslation } from 'language';
import { Ctx, On, Scene, SceneEnter, TelegrafException } from 'nestjs-telegraf';
import { TelegramError } from 'telegraf';
import { Keyboard } from 'telegram-keyboard';
import { getUserLanguage } from 'utils';

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
    const { id } = ctx.from;
    const language_code = await getUserLanguage(id);

    const letter = await getUserBioAPI(id);

    if (letter) {
      await ctx.reply(`"${letter}"`);
    } else {
      await ctx.reply(`"no information"`);
    }

    const INSTRUCTIONS = getTranslation(
      language_code,
      this.currentScene,
      'INSTRUCTIONS',
    );

    const len = INSTRUCTIONS.length;

    let pointer = 0;
    const interval = setInterval(async () => {
      await ctx.reply(INSTRUCTIONS[pointer]);
      pointer++;

      if (pointer === len) {
        clearInterval(interval);
        await this.getFinalInstruction(ctx);
        if (language_code === 'ru') {
          await this.getPromo(ctx);
        }
      }
    }, 2000);
  }

  async getFinalInstruction(@Ctx() ctx) {
    const { id } = ctx.from;
    const language_code = await getUserLanguage(id);
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

    const gift = await getUserGiftAPI(id);

    if (!gift.giftCode) {
      await ctx.reply('gift code wasn`t found. Contact @partnadem');
    }

    await ctx.reply(`${codeButtonText} ${gift.giftCode}`);

    await ctx.scene.leave();
  }

  async getPromo(@Ctx() ctx) {
    await ctx.reply(
      'А еще, чтобы создать себе праздничное настроение на максимум, принимай участие в новогоднем челлендже #ITMOhohoho🎅\nВыполняй ежедневные задания из чек-листа и поборись за супер-набор от ИТМО!\nПереходи в наш Инстаграм для участия @itmoru 😎',
      Keyboard.make([
        {
          text: 'Ого, звучит классно!',
          type: 'button',
          callback_data: JSON.stringify({
            queryType: 'OK',
          }),
        },
      ]).inline(),
    );
  }
}
