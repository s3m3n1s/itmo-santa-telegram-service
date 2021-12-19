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
export class AlreadyRegisteredUser implements CanActivate {
  private readonly ADMIN_IDS = [];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();
    const { id } = from;

    const user = await getUserAPI(id);

    if (user.tg_id) {
      if (user.language_code === 'ru') {
        throw new TelegrafException('Вы уже зарегистрированы');
      } else {
        throw new TelegrafException('You were already registered');
      }

      return false;
    }

    return true;
  }
}
