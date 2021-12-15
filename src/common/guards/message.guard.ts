import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getUserAPI } from 'api';
import {
  GIFT_DELIVERED_SCENE,
  RECEIVER_ATTACHED_SCENE,
  REGISTRATION_SCENE,
} from 'app.constants';
import { sendLetterKeyboard, sendBioKeyboard } from 'keyboards/message';
import { getTranslation } from 'language';

import {
  TelegrafExecutionContext,
  TelegrafException,
  Ctx,
} from 'nestjs-telegraf';
import { getUserLanguage } from 'utils';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class MessageGuard implements CanActivate {
  private readonly ADMIN_IDS = [];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { scene, from, telegram } = ctx.getContext<Context>();
    const { id } = from;
    const language_code = await getUserLanguage(id);

    const user = await getUserAPI(id);

    if (!user.tg_id) {
      await telegram.sendMessage(
        id,
        'Привет! Вижу, ты ещё не зарегистрировался в игре в Тайного Санту. Давай это исправим!',
      );
      await scene.enter(REGISTRATION_SCENE);
      return true;
    }

    if (!user.bio && this.canSendBioRequest(user.progress)) {
      await telegram.sendMessage(
        id,
        getTranslation(language_code, 'SUPPORT', 'FILL_BIO'),
        sendBioKeyboard('✅', '❌'),
      );
      return true;
    }

    if (!user.letter && user.progress === GIFT_DELIVERED_SCENE) {
      await telegram.sendMessage(
        id,
        getTranslation(language_code, 'SUPPORT', 'FILL_LETTER'),
        sendLetterKeyboard('✅', '❌'),
      );
      return true;
    }

    throw new TelegrafException(
      getTranslation(language_code, 'SUPPORT', 'FILL_IDLE'),
    );

    return true;
  }

  async handleUserProgress(userStatus: string, @Ctx() ctx) {
    console.log(userStatus);
  }

  canSendBioRequest(progress: string) {
    switch (progress) {
      case RECEIVER_ATTACHED_SCENE:
        return false;
      case GIFT_DELIVERED_SCENE:
        return false;
      default:
        return true;
    }
  }
}
