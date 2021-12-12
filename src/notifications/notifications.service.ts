import { Injectable } from '@nestjs/common';
import { GreeterBotName } from 'app.constants';
import {
  readLetterKeyboard,
  visitDeliverPlaceKeyboard,
} from 'keyboards/gift-delivered';
import { readReceiverBioKeyboard } from 'keyboards/receiver-attached';
import { onRegistrationKeyboard } from 'keyboards/registration';
import { getTranslation, lang } from 'language';
import { InjectBot } from 'nestjs-telegraf';
import { RegistrationScene } from 'scenes/registration.scene';
import { Context, Telegraf } from 'telegraf';
import { encodeMessageTypeToEmoji } from 'utils';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly registrationScene: RegistrationScene,
  ) {}

  // async sendNotification(data) {
  //   this.bot.telegram.sendChatAction(data.receiverId, 'typing');
  //   if (data.title) {
  //     this.bot.telegram.sendMessage(
  //       data.receiverId,
  //       `<b>${encodeMessageTypeToEmoji(data.type)} ${data.title}</b>\n${
  //         data.message
  //       }`,
  //       {
  //         reply_markup: readReceiverBio.reply_markup,
  //         parse_mode: 'HTML',
  //       },
  //     );
  //   } else {
  //     this.bot.telegram.sendMessage(data.receiverId, `${data.message}`, {
  //       reply_markup: readReceiverBio.reply_markup,
  //       parse_mode: 'HTML',
  //     });
  //   }
  // }

  async send(receiver, message, keyboard) {
    await this.bot.telegram.sendMessage(receiver, `${message}`, {
      reply_markup: keyboard?.reply_markup,
      parse_mode: 'HTML',
    });
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
      readReceiverBioKeyboard(
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
      getTranslation(
        language_code,
        'REGISTRATION_SCENE',
        'AUTH_PHRASE_KEYBOARD',
      ),
      visitDeliverPlaceKeyboard,
    );
  }

  async onIncomingLetter({ receiverId, language_code = 'ru' }) {
    await this.send(
      receiverId,
      lang[language_code].REGISTRATION.AUTH_PHRASE_KEYBOARD,
      readLetterKeyboard,
    );
  }
}
