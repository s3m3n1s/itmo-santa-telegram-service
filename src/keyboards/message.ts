import { Keyboard } from 'telegram-keyboard';

export const sendBioKeyboard = (yes, no) =>
  Keyboard.make([
    {
      text: yes,
      type: 'button',
      callback_data: JSON.stringify({ queryType: 'SEND_BIO', action: 'SEND' }),
    },
    {
      text: no,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'DONT_SEND_BIO',
        action: 'SEND',
      }),
    },
  ]).inline();

export const sendLetterKeyboard = (yes, no) =>
  Keyboard.make([
    {
      text: yes,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'SEND_LETTER',
        action: 'SEND',
      }),
    },
    {
      text: no,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'DONT_SEND_LETTER',
        action: 'SEND',
      }),
    },
  ]).inline();
