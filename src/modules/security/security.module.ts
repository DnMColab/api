import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Resend } from 'resend';

import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { RequestsSecurityService } from './services/requests.security.service';
import { ActionsSecurityService } from './services/actions.security.service';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { AccountRepository } from 'src/repositories/account.repository';
import { SecurityController } from './security.controller';
import { TokenManageService } from 'src/utils/jwt.util';
import { MailService } from 'src/utils/mail.util';
import { Utils } from './services/utils';

@Module({
  controllers: [SecurityController],
  providers: [
    SecurityRequestRepository,
    RequestsSecurityService,
    ActionsSecurityService,
    TokenManageService,
    AccountRepository,
    ProfileRepository,
    ConfigService,
    PrismaClient,
    MailService,
    JwtService,
    Resend,
    Utils,
  ],
})
export class SecurityModule {}
