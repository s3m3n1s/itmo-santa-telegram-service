import { Injectable } from '@nestjs/common';
import { REST_API_URL } from 'app.constants';
import axios from 'axios';

@Injectable()
export class StartService {
  async connect(token: string, tgId: string) {
    if (!token) {
      return '✋Введите токен авторизации из личного кабинета ИТМО.САНТЫ✋';
    }

    const result = await axios.patch(
      `${REST_API_URL}/users/link/${token}/${tgId}`,
    );

    if (result.data.token === token) {
      return '⛄ Вы успешно авторизовались в сервисе ИТМО.САНТА ⛄';
    }

    return 'Произошла ошибка авторизации.\nПроверьте правильность токена.';
  }

  async languageSelect(language: string) {
    if (language === 'ru') {
      return 'Установлен русский язык!';
    } else if (language === 'en') {
      return 'English language was choosen!';
    }
  }

  async authMessage() {
    return 'А ты точно из ИТМО?\nЧтобы использовать бота, нужно авторизоваться через ИСУ. После входа Вам в чат придёт сообщение с дальнейшими инструкциями.';
  }

  async me(data) {
    return data;
  }
}
