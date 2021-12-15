import { Module } from '@nestjs/common';
import { CommandHandler } from 'bot_handlers/command.handler';
import { ManagerHandler } from 'bot_handlers/manager.handler';
import { MessageHandler } from 'bot_handlers/message.handler';
import { NotificationHandler } from 'bot_handlers/notification.handler';
import { BioScene } from 'scenes/bio.scene';
import { FinalScene } from 'scenes/final.scene';
import { GiftDelivered } from 'scenes/gift-delivered.scene';
import { LetterScene } from 'scenes/letter.scene';
import { ReceiverAttached } from 'scenes/receiver-attached.scene';
import { RegistrationScene } from 'scenes/registration.scene';
import { UserProfileScene } from 'scenes/user-profile.scene';
import { StartService } from './main.service';

@Module({
  providers: [
    ManagerHandler,
    NotificationHandler,
    CommandHandler,
    MessageHandler,
    BioScene,
    LetterScene,
    RegistrationScene,
    UserProfileScene,
    ReceiverAttached,
    GiftDelivered,
    FinalScene,
  ],
})
export class MainModule {}
