import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { SecurityModule } from './modules/security/security.module';
import { AccountModule } from './modules/account/account.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AccountModule,
    AuthModule,
    ProfileModule,
    SecurityModule,
  ],
})
export class AppModule {}
