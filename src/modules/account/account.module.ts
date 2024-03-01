import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AccountRepository } from 'src/repositories/account.repository';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [PrismaClient, AccountRepository, AccountService],
})
export class AccountModule {}
