const jwt = require('jsonwebtoken');

export const generateAuthLink = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_AUTH_SECRET);
  return token;
};

export const encodeMessageTypeToEmoji = (type: string) => {
  switch (type) {
    case 'GIFT_STATUS_CHANGED':
      return '🎁';
    case 'ALERT':
      return '⚠️';
    case 'NEWS':
      return '📰';
    case 'THANK_SANTA':
      return '🎅🏻';
    default:
      return 'ℹ️';
  }
};

export const translateDeliverStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Обрабатывается ⌛';
    case 'delivered':
      return 'Готово к выдаче 📫';
    case 'received':
      return 'Выдано ✨';
    default:
      return 'Обрабатывается ⌛';
  }
};
