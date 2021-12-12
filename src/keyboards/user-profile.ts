import { Keyboard } from 'telegram-keyboard';

export const greetingsKeyboard = Keyboard.make([
  {
    text: 'Время чудес!',
    type: 'button',
    callback_data: JSON.stringify({ queryType: 'FILL_PROFILE' }),
  },
]).inline();

export const instructionsKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({ queryType: 'WAIT_FOR_RECEIVER' }),
    },
  ]).inline();

export const waitKeyboard = (text1, text2, text3) =>
  Keyboard.make([
    [
      {
        text: text1,
        type: 'button',
        callback_data: JSON.stringify({ queryType: 'ABOUT_PROJECT' }),
      },
    ],
    [
      {
        text: text2,
        type: 'button',
        callback_data: JSON.stringify({ queryType: 'WAIT_FOR_RECEIVER' }),
      },
    ],
    [
      {
        text: text3,
        type: 'button',
        callback_data: JSON.stringify({ queryType: 'IDLE' }),
      },
    ],
  ]).inline();
