import axios from 'axios';

export const getUserAPI = async (userId: string | number) => {
  try {
    const res = await axios.get(
      `${process.env.REST_API}/users/getBy/tg_id/${userId}`,
    );
    console.log('запрошена информация о юзере ', userId);
    return res.data;
  } catch (err) {
    console.log(userId, err.response?.data);
    return 'Error was occured while getting user info';
  }
};

export const sendUserBioAPI = async (userId: string, bio: string) => {
  try {
    const res = await axios.patch(
      `${process.env.REST_API}/users/update/${userId}/`,
      {
        bio,
      },
    );

    console.log(userId, ' заполнил информацию о себе');
    return res.data;
  } catch (err) {
    console.log(userId, err.response?.data);
    return err.response.data;
  }
};

export const getUserBioAPI = async (userId: string) => {
  try {
    const gift = await axios.get(
      `${process.env.REST_API}/gifts/getBy/creatorId/${userId}/`,
    );

    const users = await axios.get(
      `${process.env.REST_API}/users/get/${gift.data.receiverId}/`,
    );
    const bio = users.data.bio;
    console.log(userId, 'получил пожелания от своего получателя');
    return bio;
  } catch (err) {
    console.log(userId, err.response?.data);
  }
};

export const sendUserLetterAPI = async (
  giftCreatorId: string,
  letter: string,
) => {
  try {
    const res = await axios.patch(
      `${process.env.REST_API}/users/update/${giftCreatorId}/`,
      {
        letter,
      },
    );

    console.log(giftCreatorId, ' отправил письмо ');
    return res.data;
  } catch (err) {
    console.log(giftCreatorId, err.response?.data);
    return err.response.data;
  }
};

export const updateUserProgressAPI = async (
  userId: string,
  progress: string,
) => {
  try {
    const res = await axios.patch(
      `${process.env.REST_API}/users/update/${userId}/`,
      {
        progress,
      },
    );

    console.log(userId, ' перешёл на этап: ', progress);

    return res.data;
  } catch (err) {
    console.log(userId, err.response?.data);
    return err.response.data;
  }
};

export const getUserGiftAPI = async (userId: string) => {
  try {
    const res = await axios.get(
      `${process.env.REST_API}/gifts/getBy/tg_id/${userId}`,
    );

    console.log(`Запрошена информация о подарке юзера ${userId}`);

    return res.data;
  } catch (err) {
    console.log(userId, err.response?.data);
    return err.response.data;
  }
};
