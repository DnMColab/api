import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';

import { AccountRepository } from 'src/repositories/account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [PrismaClient, AccountRepository, AccountService, ConfigService],
})
export class AccountModule {}
