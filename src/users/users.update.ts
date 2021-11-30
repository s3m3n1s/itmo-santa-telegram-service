import { UseFilters, UseInterceptors } from '@nestjs/common';
import {
  Command,
  Hears,
  InjectBot,
  TelegrafException,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { GreeterBotName } from 'app.constants';
import { UsersService } from './users.service';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class UsersUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly usersService: UsersService,
  ) {}

  @Command('connect')
  async linkUser(ctx) {
    const { id } = ctx.from;
    const token = ctx.update.message.text.split(' ')[1];

    return await this.usersService.connect(token, id);
  }

  @Command('me')
  async me(ctx) {
    const { id } = ctx.from;
    return await this.usersService.me(id);
  }
}
