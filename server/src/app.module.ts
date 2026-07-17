import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ChatModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
