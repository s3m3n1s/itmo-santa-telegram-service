import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GiftsService {
  async getUserGifts(tgId: string) {
    const result = await axios.get(
      `http://localhost:3030/gifts/getBy/tg_id/${tgId}`,
    );

    return JSON.stringify(result.data);
  }
}
