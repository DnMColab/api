import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { ProfileController } from './profile.controller';
import { AccountRepository } from 'src/repositories/account.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [PrismaClient, AccountRepository, JwtService, ProfileRepository],
})
export class ProfileModule {}
