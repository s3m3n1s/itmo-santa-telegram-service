import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getUserAPI } from 'api';
import {
  TelegrafExecutionContext,
  TelegrafException,
  Ctx,
} from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class LetterGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from, scene } = ctx.getContext<Context>();
    const { id } = from;

    const user = await getUserAPI(id);

    if (user.letter) {
      await scene.leave();
      throw new TelegrafException(
        'Вы уже отправляли письмо получателю подарка.',
      );
    }

    return true;
  }

  async handleUserProgress(userStatus: string, @Ctx() ctx) {
    console.log(userStatus);
  }
}
