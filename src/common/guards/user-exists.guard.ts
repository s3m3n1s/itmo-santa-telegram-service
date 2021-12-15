import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getUserAPI } from 'api';
import { REGISTRATION_SCENE } from 'app.constants';
import { getTranslation } from 'language';
import {
  TelegrafExecutionContext,
  TelegrafException,
  Ctx,
} from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class TelegramUserRegistered implements CanActivate {
  private readonly ADMIN_IDS = [];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { scene, from } = ctx.getContext<Context>();
    const { id, language_code } = from;

    const user = await getUserAPI(id);

    if (!user.tg_id) {
      throw new TelegrafException(
        getTranslation(
          language_code,
          REGISTRATION_SCENE,
          'USER_NOT_REGISTERED',
        ),
      );
    }

    return true;
  }
}
