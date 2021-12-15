import { UseFilters, UseInterceptors } from '@nestjs/common';
import { FINAL_SCENE } from 'app.constants';
import { TelegrafExceptionFilter } from 'common/filters/telegraf-exception.filter';
import { ResponseTimeInterceptor } from 'common/interceptors/response-time.interceptor';

import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
@Scene(FINAL_SCENE)
export class FinalScene {
  currentScene: string;
  constructor() {
    this.currentScene = FINAL_SCENE;
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    await ctx.reply(
      'Уф, подарок доставили, письмо отправили. Можно и отдохнуть.',
    );
  }

  @On('message')
  async onMessage() {
    return 'Никаких действий более не требуется. Отдыхай!';
  }
}
