export const getTranslation = (
  userLanguage = 'en',
  scene: string,
  phrase: string,
) => {
  const currentLanguage = userLanguage === 'ru' ? 'ru' : 'en';

  if (!scene) {
    return 'SCENE_NAME_IS_REQUIRED';
  }
  if (!phrase) {
    return 'PHRASE_NAME_IS_REQUIRED';
  }

  if (!lang[currentLanguage][scene]) {
    return 'INCORRECT_SCENE_NAME: ' + scene;
  }
  if (!lang[currentLanguage][scene][phrase]) {
    return `PHRASE "${phrase}" DOESNT EXIST ON SCENE: ${scene}`;
  }

  return lang[currentLanguage][scene][phrase];
};

export const lang = {
  ru: {
    REGISTRATION_SCENE: {
      START: `Choose your fighter: Тайный Санта or Secret Santa?`,
      START_KEYBOARD: 'Окей / Understood',
      AUTH_PHRASE:
        'А ты точно из ИТМО?\nНажми на кнопку, чтобы авторизироваться через ИСУ',
      AUTH_PHRASE_KEYBOARD: 'Авторизироваться',
      USER_NOT_REGISTERED:
        'Вы не авторизированы в системе. Чтобы использовать бота, необходимо авторизироваться. Введите команду /start',
    },
    USER_PROFILE_SCENE: {
      START: (
        username = 'дорогой участник',
      ) => `Хо-хо-хо, привет, ${username}! Или лучше называть тебя Тайным Сантой?
Ты стал участником самого масштабного обмена подарками в ИТМО! Давай скорее начнем наш круговорот приятностей. Ты готов подарить новогоднее настроение себе и ITMO Family?`,
      ARE_YOU_READY_KEYBOARD: `Готов!`,
      SENT_BIO: 'Отправил!',

      TELL_ABOUT_YOURSELF: `Расскажи о себе!
Может, ты заядлый геймер или на досуге вяжешь шапочки для котиков? А может, имбирные печеньки из ИКЕА твой guilty pleasure? В общем, напиши в ответном сообщении все, что стоит знать твоему Тайному Санте, прежде чем выбрать для тебя подарок.`,
      INSTRUCTIONS: [
        `Супер! Давай я еще немного расскажу о том, что тебя ждет.`,
        `16 и 17 декабря мы регистрируем всех Тайных Сант.`,
        `С 18 по 20 декабря включительно волшебный рандом определит того счастливчика, для которого ты станешь Тайным Сантой, а также присвоит индивидуальный номер твоему подарку.
Постарайся уложиться в сумму от 400 до 600 рублей.`,
        `С 20 по 22 декабря наши волшебные эльфы будут ждать тебя с подарком в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505), с 9:00 до 21:00. Сообщи индивидуальный номер подарка и отдай его эльфу на хранение и доставку.`,
        `23 декабря ты получишь от меня новый номер подарка — те самые 6 золотых цифр, назвав которые ты сможешь получить подарок, предназначенный для тебя.`,
        `С 23 по 25 декабря включительно снова навести эльфов в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505), с 9:00 до 21:00, чтобы забрать подарок, который тебя заждался.`,
      ],
      FINAL_INSTRUCTION: `Не переживай, я всегда онлайн, чтобы напомнить тебе о наших незавершенных волшебных делишках.`,
      FINAL_INSTRUCTION_KEYBOARD: 'Полный джингл белс!',
      WAIT: `Пока ты можешь заняться приятными предновогодними хлопотами (нарядить елку, приготовить какао с зефирками). Я скоро вернусь к тебе, чтобы рассказать о том, какой же он — счастливчик, который получит от тебя подарок.`,
      TELL_ABOUT_PROJECT_KEYBOARD: 'А расскажи снова о проекте',
      WHO_IS_MY_RECEIVER_KEYBOARD: 'Так кому я там дарю?',
      IDLE_KEYBOARD: 'Ожидаю',
    },

    RECEIVER_ATTACHED_SCENE: {
      START: `Хо-хо-хо, пришло время отправиться за самым лучшим новогодним подарком. Да-да, он будет именно таким, у меня нет никаких сомнений! Ведь его подготовишь ты.
Итак, вот, что о себе рассказал участник, которому предназначен твой подарок.`,
      READ_LETTER_KEYBOARD: 'Прочитать',
      READ_BIO_KEYBOARD: 'Прочитать информацию о получателе',
      ALREADY_READ_LETTER_KEYBOARD: 'Прочитал',
      INSTRUCTIONS: [
        `Уверен, у тебя в голове уже куча идей, что бы подарить. Но давай договоримся: уложись в сумму от 400 до 600 рублей.
`,
        `Только не забудь передать подарок помощникам-эльфам. Они будут ждать тебя с подарком с 20 по 22 декабря включительно в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505), с 9:00 до 21:00. Укажи индивидуальный код на самом подарке, сообщи его эльфам и передай подарок им на хранение.`,
      ],
      FINAL_INSTRUCTION: 'Код подарка: ',
      FINAL_INSTRUCTION_KEYBOARD: 'Побежал за подарком, отключаюсь.',
      REMIND_ABOUT_DELIVER: `Хэй, мой дорогой Тайный Санта, эльфы уже заждались тебя. Даже приготовили место для хранения твоего подарка. Не забудь забежать к ним до девяти вечера 20 декабря в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505).`,
      REMING_ABOUT_DELIVER_KEYBOARD: 'Точно, спасибо, что напомнил!',
      GIFT_WAS_DELIVERED: `Вижу, ты принес подарок. Совсем скоро как минимум один участник нашего круговорота приятностей станет чуточку счастливее. Ведь он получит подарок от тебя!`,
      REMIND_ABOUT_LETTER:
        'Кстати! Совсем забыл сказать. После того, как доставишь подарок на Ломоносова 9, ты сможешь отправить письмо получателю подарка. Участник получит твое послание, когда заберет предназначенный ему подарок.',
    },
    GIFT_DELIVERED_SCENE: {
      START: `Хо-хо-хо, и снова привет, мой дорогой Тайный Санта! Настал самый приятный этап этой недели — период получения подарков. Твой подарок уже ждет тебя! Индивидуальный код для его получения — ******. Приходи в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505), 23 и 24 декабря с 9:00 до 21:00, называй эльфам индивидуальный код подарка для тебя и забирай свой кусочек новогоднего настроения.`,
      START_KEYBOARD: `Ура! Пора отправляться на ломо.`,
      LETTER_RECEIVED: `У меня для тебя сюрприз! Меня тут один участник попросил передать сообщение для тебя`,
      LETTER_RECEIVED_KEYBOARD: `Как неожиданно и приятнооо`,
      REMIND_ABOUT_GIFT: `Твой подарок уже соскучился по тебе и мечтает попасть к тебе в руки. Скорее забери его в BIBLA ITMO на ул. Ломоносова, 9 (пятый этаж, ауд. 1505)— 24 декабря с 9:00 до 21:00. Не забудь назвать эльфам индивидуальный код подарка.`,
      GIFT_WAS_RECEIVED: `Поздравляю с получением подарка! Скорее посмотри, что для тебя приготовил твой личный Тайный Санта. Также ты можешь посмотреть письмо, которое оставил для тебя твой Тайный Санта. Нажми на кнопку ✉️`,
      GIFT_WAS_RECEIVED_KEYBOARD: `❤️`,
      GIFT_RECEIVED: '',
      SEND_LETTER: 'Напиши письмо получателю подарка ответным сообщением: ',
      MY_GIFT_WAS_RECEIVED:
        'Твой подарок забрали! Если ты оставлял письмо, то оно было отправлено получателю.',
      BOT_ENDGAME: [
        `Ну все, моя работа предновогоднего сводника завершена. Я рад был запустить этот круговорот подарков и сделать ITMO Family немного счастливее. Спасибо, что принял участие и стал моим верным помощником — Тайным Сантой. `,
        `Надеюсь, мы спишемся снова через годик, ведь в ИТМО создают новогоднее настроение since 1900.
Счастливого Нового года!
`,
      ],
    },

    SUPPORT: {
      FILL_BIO: 'Хотите заполнить информацию о себе для тайного Санты?',
      FILL_LETTER: 'Хотите отправить получателю анонимное письмо?',
      FILL_IDLE: 'Пока дополнительная информация от тебя не требуется',
    },
  },
  en: {
    REGISTRATION_SCENE: {
      START: `Choose your fighter: Тайный Санта or Secret Santa?`,
      START_KEYBOARD: 'Окей / Understood',
      AUTH_PHRASE: 'Are you definitely from ITMO?',
      AUTH_PHRASE_KEYBOARD: 'Auth with ISU',
      USER_NOT_REGISTERED: 'Print command /start',
    },
    USER_PROFILE_SCENE: {
      START: (username = 'username') => `Ho-ho-ho! Hi, Secret Santa?
You are now a part of ITMO’s biggest-ever gift exchange. Let’s get to the good stuff! Are you ready to bring some holiday joy to yourself and the rest of ITMO.FAMILY?
`,
      ARE_YOU_READY_KEYBOARD: `Can’t wait!`,
      SENT_BIO: 'Sent!',
      TELL_ABOUT_YOURSELF: `First, tell me a bit about yourself!
Are you a die-hard gamer? Do you knit hats for cats? Maybe ginger cookies from IKEA are your true guilty pleasure? Just reply to me with all the things your own Secret Santa should know to choose the right gift for you.
`,
      INSTRUCTIONS: [
        `Great! Now, let me tell you a bit more about what’s coming.`,
        `On December 16-17, we wait for all the Secret Santas to sign up.`,
        `Between December 18 and 20, the magic random-bot will determine the lucky recipient of your gift and assign a unique number to your gift. Try to keep the price of your gift between 400 and 600 rubles.`,
        `On December 20-22, the ITMO elves will await you and your gift at the library (5th floor, room 1505) at the Lomonosova St. 9 campus from 9 AM till 9 PM.`,
        `Once you’re there, tell your number to one of our elves and give them the box.`,
        `On December 23, you’ll receive a new number – this time, it’s the number of the gift someone prepared for you!`,
        `On December 23-25, come back to the library to pick up your lovely present!`,
      ],
      FINAL_INSTRUCTION: `And don’t worry, I’m always online and ready to remind you what to do.`,
      FINAL_INSTRUCTION_KEYBOARD: 'Got it!',
      WAIT: `For now, relax and enjoy your pre-holiday prep (decorate a tree or enjoy some hot cocoa). I’ll be back soon to tell you about the lucky person who will receive your gift!`,
      TELL_ABOUT_PROJECT_KEYBOARD: 'Can you tell me about this exchange again?',
      WHO_IS_MY_RECEIVER_KEYBOARD: 'So, who’s my gift buddy?',
      IDLE_KEYBOARD: 'OK, I’ll be waiting.',
    },

    RECEIVER_ATTACHED_SCENE: {
      START: `Ho-ho-ho! Time to go shopping for the best New Year’s gift. Yes, it will be the very best – I have no doubt about that! After all, it’s a gift from you!`,
      READ_LETTER_KEYBOARD: 'Read letter from Secret Santa',
      READ_BIO_KEYBOARD: 'Read information about gift receiver',
      ALREADY_READ_LETTER_KEYBOARD: 'Already read',
      INSTRUCTIONS: [
        `I’m sure you already have plenty of ideas in your head. But let’s agree on one thing: try to keep it between 400 and 600 rubles.`,
        `And remember to bring the gift to our elves! They’ll be waiting for you on December 20-22 at the library (5th floor, room 1505) at Lomonosova St. 9 from 9 AM till 9 PM. Write the gift number on the package and tell it to the elves when you give them the present.`,
      ],
      FINAL_INSTRUCTION: 'Your gift’s individual code is',
      FINAL_INSTRUCTION_KEYBOARD: 'Got it! Buying gift, brb <3',
      REMIND_ABOUT_DELIVER: `Hi! The elves are waiting. We saved a spot for your gift. Don’t forget to drop by the library (5th floor, room 1505) at Lomonosova St. 9 before 9 PM on December 20!`,
      REMING_ABOUT_DELIVER_KEYBOARD: 'Thanks for the reminder!',
      SEND_LETTER:
        'Send message to chat and I will send it to the gift receiver.',
      GIFT_WAS_DELIVERED: `I see you’ve brought your gift. Very soon, at least one member of ITMO.FAMILY will become quite happy!`,
      REMIND_ABOUT_LETTER:
        'By the way, you can add a digital message to your gift! Your gift buddy will receive your message once they’ve picked up their gift.',
    },
    GIFT_DELIVERED_SCENE: {
      START: `Ho-ho-ho! It’s me again! The nicest part is here: it’s time to open your gifts! Your present is already waiting for you. Here’s your number: ******. Come to the library (5th floor, room 1505) at Lomonosova St. 9 between 9 AM and 9 PM on December 23-24, tell your number to our elves, and pick up your own slice of holiday joy!`,
      START_KEYBOARD: `Yoo-hoo! I’m off to Lomonosova!`,
      LETTER_RECEIVED: `I’ve got a surprise! There’s a message for you!`,
      LETTER_RECEIVED_KEYBOARD: `How nice!`,
      REMIND_ABOUT_GIFT: `Your gift is waiting for you! Hurry and pick it up at the library (5th floor, room 1505) at Lomonosova St. 9 between 9 AM and 9 PM on December 24. Don’t forget to tell my elves your gift number!`,
      GIFT_WAS_RECEIVED: `Congratulations on your gift! Quick, go and hurry up and open your present. Also you can press the button ✉️ and read message from your Secret Santa!`,
      GIFT_WAS_RECEIVED_KEYBOARD: `❤️`,
      GIFT_RECEIVED: '',
      MY_GIFT_WAS_RECEIVED:
        'Your gift was received!\nIf you sent a letter, it was also delivered.',
      BOT_ENDGAME: [
        `Well, my job here is done. It was my pleasure to help you make our ITMO.FAMILY a bit happier. Thank you for participating and being my trusty secret helper.
I hope to see you again next year! Happy New Year!
`,
      ],
    },
    SUPPORT: {
      FILL_BIO:
        'Do you want to send information about you to your Secret Santa?',
      FILL_LETTER: 'Do you want to send letter to the gift receiver?',
      FILL_IDLE: 'No information needed',
    },
  },
};
