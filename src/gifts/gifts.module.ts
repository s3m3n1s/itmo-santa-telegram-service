import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsUpdate } from './gifts.update';

@Module({
  providers: [GiftsUpdate, GiftsService],
})
export class GiftsModule {}
