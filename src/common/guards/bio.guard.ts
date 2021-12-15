import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { getUserAPI } from 'api';
import { TelegrafExecutionContext, Ctx } from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class BioGuard implements CanActivate {
  private readonly ADMIN_IDS = [];

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = TelegrafExecutionContext.create(context);
    const { from, telegram, scene } = ctx.getContext<Context>();
    const { id } = from;

    const user = await getUserAPI(id);

    if (user.bio) {
      await telegram.sendMessage(
        id,
        'Вы уже отправляли информацию о себе. Можете её обновить.',
      );
    }

    return true;
  }

  async handleUserProgress(userStatus: string, @Ctx() ctx) {
    console.log(userStatus);
  }
}
