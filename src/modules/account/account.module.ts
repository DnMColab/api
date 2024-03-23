import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';

import { AccountRepository } from 'src/repositories/account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ConfigService } from '@nestjs/config';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    PrismaClient,
    AccountRepository,
    ProfileRepository,
    AccountService,
    ConfigService,
  ],
})
export class AccountModule {}
