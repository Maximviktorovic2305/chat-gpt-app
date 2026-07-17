import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: (process.env.ALLOWED_ORIGINS ||
      'https://ai-contact.site,https://www.ai-contact.site,https://aicontact.tech,https://www.aicontact.tech')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  })

  app.setGlobalPrefix('api')

  await app.listen(4568);
}
bootstrap();
