import { UseFilters, UseInterceptors } from '@nestjs/common';
import { Command, InjectBot, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { GiftsService } from './gifts.service';
import { GreeterBotName } from 'app.constants';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class GiftsUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly giftsService: GiftsService,
  ) {}
  @Command('gifts')
  async getUserGifts(ctx) {
    const userId = ctx.from.id;
    return await this.giftsService.getUserGifts(userId);
  }
}
