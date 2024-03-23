import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';

import { AccountRepository } from 'src/repositories/account.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { TokenManageService } from 'src/utils/jwt.util';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_REST_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    TokenManageService,
    AccountRepository,
    ConfigService,
    PrismaClient,
    AuthService,
    JwtService,
  ],
})
export class AuthModule {}
