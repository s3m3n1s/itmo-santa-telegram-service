import axios from 'axios';

export const getUserAPI = async (id: string | number) => {
  try {
    const res = await axios.get(
      `${process.env.REST_API}/users/getBy/tg_id/${id}`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const authUserAPI = async (id: string) => {
  try {
    const res = await axios.get(`${process.env.REST_API}/users/auth/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
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

    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const getUserBioAPI = async (userId: string) => {
  try {
    const gift = await axios.get(
      `${process.env.REST_API}/gifts/getBy/receiverId/${userId}/`,
    );

    const users = await axios.get(
      `${process.env.REST_API}/users/get/${gift.data.creatorId}/`,
    );
    const bio = users.data.bio;
    return bio;
  } catch (err) {
    console.log(err);
    return err.response.data;
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
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};
