import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';

export const VERIFICATION_EMAIL_ALREADY_SENT_ERROR =
  'Verification email already sent';
export const VERIFICATION_REQUEST_NOT_FOUND_ERROR =
  'Verification request not found';
export const VERIFICATION_REQUEST_EXPIRED_ERROR =
  'Verification request expired';
export const PROFILE_NOT_FOUND_ERROR = 'Profile not found';
export const INVALID_TOKEN_ERROR = 'Invalid token';
export const PROFILE_ALREADY_VERIFIED_ERROR = 'Profile already verified';
export const ERROR_VERIFICATION_PROFILE = 'Error verifying profile';

@Injectable()
export class Utils {
  constructor(
    private readonly securityRequestRepository: SecurityRequestRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async checkVerificationRequest(accountId: string, mustExist = true) {
    const securityRequest =
      await this.securityRequestRepository.getByAccountId(accountId);

    if (!securityRequest && mustExist) {
      throw new HttpException(
        { message: VERIFICATION_REQUEST_NOT_FOUND_ERROR },
        HttpStatus.NOT_FOUND,
      );
    }

    if (securityRequest && securityRequest.expires < Date.now()) {
      await this.securityRequestRepository.delete(
        accountId,
        securityRequest.token,
      );
      throw new HttpException(
        { message: VERIFICATION_REQUEST_EXPIRED_ERROR },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!mustExist && securityRequest) {
      throw new HttpException(
        { message: VERIFICATION_EMAIL_ALREADY_SENT_ERROR },
        HttpStatus.BAD_REQUEST,
      );
    }

    return securityRequest;
  }

  public async checkProfile(accountId: string) {
    const profile =
      await this.profileRepository.getProfileByAccountId(accountId);

    if (!profile) {
      throw new HttpException(
        { message: PROFILE_NOT_FOUND_ERROR },
        HttpStatus.NOT_FOUND,
      );
    }

    if (profile.verified) {
      return null;
    }

    return profile;
  }
}
