import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GiftsService {
  async getUserGifts(tgId: string) {
    const res = await axios.get(
      `${process.env.REST_API}/gifts/getBy/tg_id/${tgId}`,
    );

    return res.data;
  }

  async putGift(giftCode: number) {
    const status = 'delivered';
    const res = await axios.patch(
      `${process.env.REST_API}/gifts/updateByCode/${giftCode}/${status}`,
    );

    if (res.data.modifiedCount) return 'okay lesgo';
    else return ')';
  }

  async getGift(giftCode: number) {
    const status = 'received';
    const res = await axios.patch(
      `${process.env.REST_API}/gifts/updateByCode/${giftCode}/${status}`,
    );

    if (res.data.modifiedCount) return 'okay lesgo';
    else return ')';
  }
}
