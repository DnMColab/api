import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';

import {
  PROFILE_ALREADY_VERIFIED_ERROR,
  ERROR_VERIFICATION_PROFILE,
  INVALID_TOKEN_ERROR,
  Utils,
} from './utils';

@Injectable()
export class ActionsSecurityService {
  constructor(
    private readonly securityRequestRepository: SecurityRequestRepository,
    private readonly profileRepository: ProfileRepository,
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

      const profile = await this.utils.checkProfile(accountId);

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
        { message: ERROR_VERIFICATION_PROFILE, reason: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
