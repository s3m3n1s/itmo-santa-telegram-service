import { Injectable } from '@nestjs/common';
import { REST_API_URL } from 'app.constants';
import axios from 'axios';

@Injectable()
export class UsersService {
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

  async me(data) {
    return data;
  }
}
