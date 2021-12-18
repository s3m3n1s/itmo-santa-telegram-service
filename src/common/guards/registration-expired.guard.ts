import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';
import { Context } from '../../interfaces/context.interface';

@Injectable()
export class RegistrationExpiredGuard implements CanActivate {
  private readonly ADMIN_IDS = [];

  canActivate(context: ExecutionContext): boolean {
    const today = new Date();

    const day = today.getDate();
    const hours = today.getHours();

    if (day >= 19 && hours >= 18) {
      throw new TelegrafException(
        'Упс, регистрация в Тайном Санте уже завершена.',
      );
    }

    return true;
  }
}
