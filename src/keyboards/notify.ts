import { REGISTRATION_SCENE, USER_PROFILE_SCENE } from 'app.constants';
import { Keyboard } from 'telegram-keyboard';

export const onRegistrationKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: USER_PROFILE_SCENE,
        action: 'SCENE',
      }),
    },
  ]).inline();

export const onReceivedAttachedKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'RECEIVER_ATTACHED',
        action: 'NOTIFY',
      }),
    },
  ]).inline();

export const onGiftDeliveredKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'HOORAY',
        // action: 'NOTIFY',
      }),
    },
  ]).inline();

export const onGiftReceivedKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'GIFT_RECEIVED',
        action: 'NOTIFY',
      }),
    },
  ]).inline();

export const onMyGiftReceivedKeyboard = (text) =>
  Keyboard.make([
    {
      text,
      type: 'button',
      callback_data: JSON.stringify({
        queryType: 'HOORAY',
        // action: 'NOTIFY',
      }),
    },
  ]).inline();
