import { Injectable } from '@nestjs/common';
import { BOT_NAME } from 'app.constants';

import {
  onGiftDeliveredKeyboard,
  onGiftReceivedKeyboard,
  onMyGiftReceivedKeyboard,
  onReceivedAttachedKeyboard,
  onRegistrationKeyboard,
} from 'keyboards/notify';
import { getTranslation, lang } from 'language';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
  ) {}

  async send(receiver, message, keyboard?) {
    try {
      await this.bot.telegram.sendMessage(receiver, `${message}`, {
        reply_markup: keyboard?.reply_markup,
        parse_mode: 'HTML',
      });
    } catch (err) {
      console.log(err);

      await this.bot.telegram.sendMessage(
        receiver,
        'Не удалось отправить сообщение с сервера.',
      );
    }
  }

  async onUserAuth({
    receiverId,
    language_code = 'ru',
    username = 'дорогой участник',
  }) {
    await this.send(
      receiverId,
      getTranslation(language_code, 'USER_PROFILE_SCENE', 'START')(username),
      onRegistrationKeyboard(
        getTranslation(
          language_code,
          'USER_PROFILE_SCENE',
          'ARE_YOU_READY_KEYBOARD',
        ),
      ),
    );
  }

  async onReceiverAttach({ receiverId, language_code = 'ru' }) {
    await this.send(
      receiverId,
      getTranslation(language_code, 'RECEIVER_ATTACHED_SCENE', 'START'),
      onReceivedAttachedKeyboard(
        getTranslation(
          language_code,
          'RECEIVER_ATTACHED_SCENE',
          'READ_LETTER_KEYBOARD',
        ),
      ),
    );
  }

  async onGiftDeliver({ receiverId, language_code = 'ru' }) {
    await this.send(
      receiverId,
      getTranslation(language_code, 'GIFT_DELIVERED_SCENE', 'START'),
      onGiftDeliveredKeyboard('🎁'),
    );
  }

  async onMyGiftReceive({ receiverId, language_code = 'ru' }) {
    await this.send(
      receiverId,
      getTranslation(
        language_code,
        'GIFT_DELIVERED_SCENE',
        'MY_GIFT_WAS_RECEIVED',
      ),
      onMyGiftReceivedKeyboard('✨'),
    );
  }

  async onGiftReceive({ receiverId, language_code = 'ru' }) {
    await this.send(
      receiverId,
      getTranslation(
        language_code,
        'GIFT_DELIVERED_SCENE',
        'GIFT_WAS_RECEIVED',
      ),
      onGiftReceivedKeyboard('Прочитать письмо от тайного Санты'),
    );
  }
}
