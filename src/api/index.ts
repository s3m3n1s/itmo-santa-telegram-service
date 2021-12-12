import axios from 'axios';

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

export const sendUserLetterAPI = async (
  giftCreatorId: string,
  letter: string,
) => {
  try {
    const res = await axios.patch(
      `${process.env.REST_API}/gifts/update/${giftCreatorId}/`,
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
