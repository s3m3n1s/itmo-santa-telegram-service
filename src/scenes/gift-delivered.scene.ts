import { GIFT_DELIVERED_SCENE } from 'app.constants';
import { visitDeliverPlaceKeyboard } from 'keyboards/gift-delivered';
import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';

@Scene(GIFT_DELIVERED_SCENE)
export class GiftDelivered {
  currentScene: string;
  constructor() {
    this.currentScene = GIFT_DELIVERED_SCENE;
  }
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx) {
    const { id, language_code } = ctx.from;
    await ctx.reply(
      'Хо-хо-хо, и снова привет, мой дорогой Тайный Санта! Настал самый приятный этап этой недели — период получения подарков. Твой подарок уже ждет тебя! Индивидуальный код для его получения — ******. Приходи в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505), 23 и 24 декабря с 9:00 до 21:00, называй эльфам индивидуальный код подарка для тебя и забирай свой кусочек новогоднего настроения.',
      visitDeliverPlaceKeyboard,
    );
  }

  @On('callback_query')
  async onInlineKeyboard(@Ctx() ctx) {
    const { id, language_code } = ctx.from;
    const { queryType } = JSON.parse(ctx.update.callback_query.data);

    if (queryType === 'WENT_FOR_GIFT') {
      await ctx.reply('🥳');
    }
  }
}
