import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getUserAPI } from 'api';
import { REGISTRATION_SCENE } from 'app.constants';
import { sendLetterKeyboard, sendBioKeyboard } from 'keyboards/message';

import {
  TelegrafExecutionContext,
  TelegrafException,
  Ctx,
} from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class MessageGuard implements CanActivate {
  private readonly ADMIN_IDS = [];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { scene, from, telegram } = ctx.getContext<Context>();
    const { id } = from;

    const user = await getUserAPI(id);
    console.log(user);

    if (!user.tg_id) {
      await telegram.sendMessage(
        id,
        'Привет! Вижу, ты ещё не зарегистрировался в игре в Тайного Санту. Давай это исправим!',
      );
      await scene.enter(REGISTRATION_SCENE);
      return true;
    }

    if (!user.bio) {
      await telegram.sendMessage(
        id,
        'Хотите заполнить информацию о себе для тайного Санты?',
        sendBioKeyboard('Да', 'Нет'),
      );
      return true;
    }

    if (!user.letter) {
      await telegram.sendMessage(
        id,
        'Хотите отправить получателю анонимное письмо?',
        sendLetterKeyboard('Да', 'Нет'),
      );
      return true;
    }

    throw new TelegrafException(
      'Пока дополнительная информация от тебя не требуется',
    );

    return true;
  }

  async handleUserProgress(userStatus: string, @Ctx() ctx) {
    console.log(userStatus);
  }
}
