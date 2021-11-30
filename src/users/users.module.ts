import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersUpdate } from './users.update';

@Module({
  providers: [UsersUpdate, UsersService],
})
export class UsersModule {}
