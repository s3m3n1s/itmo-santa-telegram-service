import { UseFilters, UseInterceptors } from '@nestjs/common';
import { Command, InjectBot, On, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { GreeterBotName } from 'app.constants';
import { NotificationsService } from './notifications.service';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class NotificationsUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Command('delivered')
  async giftWasDelivered(ctx) {
    return `Подарок от вашего тайного Санты был доставлен на Ломоносова 9 (коворкинг, 4 этаж).\nКод получения: 543125`;
  }

  @Command('received')
  async giftWasReceived() {
    return `Ваш подарок забрали!\nВремя получения: 18:10 (2021.12.18)\nТеперь вы можете подарить анонимный подарок`;
  }
}
