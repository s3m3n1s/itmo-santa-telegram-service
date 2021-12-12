import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const bot = await NestFactory.create(AppModule);
  bot.listen('4020');
}
bootstrap();
