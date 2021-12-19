import { Injectable } from '@nestjs/common';
import { getUserAPI, updateUserProgressAPI } from 'api';
import {
  BOT_NAME,
  GIFT_DELIVERED_SCENE,
  RECEIVER_ATTACHED_SCENE,
  REGISTRATION_SCENE,
} from 'app.constants';

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
import { getUserLanguage } from 'utils';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectBot(BOT_NAME)
    private readonly bot: Telegraf<Context>,
  ) {}

  async send(id, message, keyboard?) {
    try {
      await this.bot.telegram.sendMessage(id, `${message}`, {
        reply_markup: keyboard?.reply_markup,
        parse_mode: 'HTML',
      });
    } catch (err) {
      console.log(err);

      await this.bot.telegram.sendMessage(
        id,
        'Не удалось отправить сообщение с сервера.',
      );
    }
  }

  async sendOne(id, message, keyboard?) {
    try {
      await this.bot.telegram.sendMessage(id, `${message}`, {
        reply_markup: keyboard?.reply_markup,
        parse_mode: 'MarkdownV2',
      });
    } catch (err) {
      console.log(err);

      await this.bot.telegram.sendMessage(
        id,
        'Не удалось отправить сообщение с сервера.',
      );
    }
  }

  async onUserAuth({ id, username = 'дорогой участник' }) {
    await updateUserProgressAPI(id, REGISTRATION_SCENE);

    const language_code = await getUserLanguage(id);
    await this.send(
      id,
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

  async onReceiverAttach({ id }) {
    await updateUserProgressAPI(id, RECEIVER_ATTACHED_SCENE);
    const language_code = await getUserLanguage(id);
    await this.send(
      id,
      getTranslation(language_code, 'RECEIVER_ATTACHED_SCENE', 'START'),
      onReceivedAttachedKeyboard(
        getTranslation(
          language_code,
          'RECEIVER_ATTACHED_SCENE',
          'READ_BIO_KEYBOARD',
        ),
      ),
    );
  }

  async onGiftDeliver({ id }) {
    await updateUserProgressAPI(id, GIFT_DELIVERED_SCENE);
    const language_code = await getUserLanguage(id);
    await this.send(
      id,
      getTranslation(language_code, 'GIFT_DELIVERED_SCENE', 'START'),
      onGiftDeliveredKeyboard('🎁'),
    );
  }

  async onMyGiftReceive({ id }) {
    const language_code = await getUserLanguage(id);
    await this.send(
      id,
      getTranslation(
        language_code,
        'GIFT_DELIVERED_SCENE',
        'MY_GIFT_WAS_RECEIVED',
      ),
      onMyGiftReceivedKeyboard('✨'),
    );
  }

  async onGiftReceive({ id }) {
    const language_code = await getUserLanguage(id);
    await this.send(
      id,
      getTranslation(
        language_code,
        'GIFT_DELIVERED_SCENE',
        'GIFT_WAS_RECEIVED',
      ),
      onGiftReceivedKeyboard('✉️'),
    );
  }
}
