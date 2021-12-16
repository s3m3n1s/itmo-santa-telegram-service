import { USER_PROFILE_SCENE } from 'app.constants';
import { Keyboard } from 'telegram-keyboard';

export const aboutLanguageKeyboard = Keyboard.make([
  {
    text: 'ru',
    type: 'button',
    callback_data: JSON.stringify({
      queryType: 'ABOUT_LANGUAGE',
      lang: 'ru',
    }),
  },
  {
    text: 'en',
    type: 'button',
    callback_data: JSON.stringify({
      queryType: 'ABOUT_LANGUAGE',
      lang: 'en',
    }),
  },
]).inline();

export const authLinkKeyboard = ({ url, text }) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      url,
    },
  ]).inline();

export const onRegistrationKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: USER_PROFILE_SCENE,
      }),
    },
  ]).inline();
