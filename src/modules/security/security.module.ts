import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { MailService } from 'src/utils/mail.util';
import { SecurityService } from './security.service';
import { AccountRepository } from 'src/repositories/account.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Module({
  controllers: [SecurityController],
  providers: [
    SecurityRequestRepository,
    AccountRepository,
    ProfileRepository,
    SecurityService,
    ConfigService,
    PrismaClient,
    MailService,
    JwtService,
    Resend,
  ],
})
export class SecurityModule {}
