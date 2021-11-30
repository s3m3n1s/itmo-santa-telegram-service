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
