import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), AccountModule, AuthModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
