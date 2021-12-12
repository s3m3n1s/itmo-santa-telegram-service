import { Module } from '@nestjs/common';
import { GiftDelivered } from 'scenes/gift-delivered.scene';
import { ReceiverAttached } from 'scenes/receiver-attached.scene';
import { RegistrationScene } from 'scenes/registration.scene';
import { UserProfileScene } from 'scenes/user-profile.scene';
import { StartService } from './start.service';
import { StartUpdate } from './start.update';

@Module({
  providers: [
    StartUpdate,
    StartService,
    //Scenes
    RegistrationScene,
    UserProfileScene,
    ReceiverAttached,
    GiftDelivered,
  ],
})
export class StartModule {}
