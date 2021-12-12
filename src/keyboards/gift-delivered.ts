import { GIFT_DELIVERED_SCENE } from 'app.constants';
import { Keyboard } from 'telegram-keyboard';

export const visitDeliverPlaceKeyboard = Keyboard.make([
  {
    text: '🎉',
    type: 'button',
    callback_data: JSON.stringify({ queryType: GIFT_DELIVERED_SCENE }),
  },
]).inline();

export const readLetterKeyboard = Keyboard.make([
  {
    text: 'Прочитать письмо',
    type: 'button',
    callback_data: JSON.stringify({ queryType: 'READ_LETTER' }),
  },
]).inline();
