import { RECEIVER_ATTACHED_SCENE } from 'app.constants';
import { Keyboard } from 'telegram-keyboard';

export const readReceiverBioKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: RECEIVER_ATTACHED_SCENE,
      }),
    },
  ]).inline();
export const receiverAttachedKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({ queryType: 'WENT_FOR_GIFT' }),
    },
  ]).inline();

export const sendLetterKeyboard = Keyboard.make([
  {
    text: 'Отправлю послание прямо сейчас',
    type: 'button',
    callback_data: JSON.stringify({ queryType: 'WILL_SEND_LETTER' }),
  },
  {
    text: 'Не хочу отправлять',
    type: 'button',
    callback_data: JSON.stringify({ queryType: 'WONT_SEND_GIFT' }),
  },
]).inline();

export const reminderKeyboard = Keyboard.make([
  {
    text: 'Окей',
    type: 'button',
    callback_data: JSON.stringify({ queryType: 'OKAY' }),
  },
]).inline();

export const waitKeyboard = Keyboard.make([
  {
    text: 'А расскажи снова о проекте',
    type: 'button',
    callback_data: 'wait for receiver',
  },
  {
    text: 'Напомни про digital-послание',
    type: 'button',
    callback_data: 'wait for receiver',
  },
  {
    text: 'Хочу отправить digital-послание',
    type: 'button',
    callback_data: 'wait for receiver',
  },
]).reply();
