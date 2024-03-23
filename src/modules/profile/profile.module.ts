import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ProfileRepository } from 'src/repositories/profile.repository';
import { ProfileController } from './profile.controller';
import { AccountRepository } from 'src/repositories/account.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [
    ProfileRepository,
    AccountRepository,
    ProfileService,
    PrismaClient,
    JwtService,
  ],
})
export class ProfileModule {}
