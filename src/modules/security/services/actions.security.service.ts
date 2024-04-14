import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';

import {
  PROFILE_ALREADY_VERIFIED_ERROR,
  ERROR_VERIFICATION_PROFILE,
  INVALID_TOKEN_ERROR,
  Utils,
} from './utils';
import { RequestType } from '@prisma/client';
import { AccountRepository } from 'src/repositories/account.repository';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ActionsSecurityService {
  constructor(
    private readonly securityRequestRepository: SecurityRequestRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly accountRepository: AccountRepository,
    private readonly configService: ConfigService,
    private readonly utils: Utils,
  ) {}

  public async verifyProfile({
    accountId,
    token,
  }: {
    accountId: string;
    token: string;
  }) {
    try {
      const securityRequest =
        await this.utils.checkVerificationRequest(accountId);

      if (securityRequest.token !== token) {
        throw new HttpException(
          { message: INVALID_TOKEN_ERROR },
          HttpStatus.BAD_REQUEST,
        );
      }

      const profile = await this.utils.checkProfile(
        accountId,
        RequestType.EMAIL_VERIFICATION,
      );

      if (profile === null) {
        return { message: PROFILE_ALREADY_VERIFIED_ERROR };
      }

      await this.profileRepository.updateProfile(profile.id, {
        verified: true,
      });

      this.securityRequestRepository.delete(accountId, token);

      return { message: 'Profile verified' };
    } catch (e) {
      throw new HttpException(
        e.message || ERROR_VERIFICATION_PROFILE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async changeEmail(email: string, accountId: string, token: string) {
    const securityRequest =
      await this.utils.checkVerificationRequest(accountId);

    const accountWithNewEmail = await this.accountRepository.getAccountBy({
      email,
    });

    if (
      securityRequest.token !== token ||
      securityRequest.type !== RequestType.EMAIL_CHANGE
    ) {
      throw new HttpException(
        { message: INVALID_TOKEN_ERROR },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (accountWithNewEmail) {
      throw new HttpException(
        { message: 'Email already in use' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.accountRepository.changeEmail(accountId, email);

    this.securityRequestRepository.delete(accountId, token);

    return { message: 'Email changed' };
  }

  async resetPassword(newPassword: string, accountId: string, token: string) {
    const securityRequest =
      await this.utils.checkVerificationRequest(accountId);

    if (
      securityRequest.token !== token ||
      securityRequest.type !== RequestType.PASSWORD_RESET
    ) {
      throw new HttpException(
        { message: INVALID_TOKEN_ERROR },
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS', 16);
    newPassword = await hash(newPassword, saltRounds);

    await this.accountRepository.changePassword(accountId, newPassword);

    this.securityRequestRepository.delete(accountId, token);

    return { message: 'Password reset' };
  }
}
