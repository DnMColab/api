import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from 'src/repositories/account.repository';
import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { MailService } from 'src/utils/mail.util';
import { ConfigService } from '@nestjs/config';
import { ProfileRepository } from 'src/repositories/profile.repository';

const VERIFICATION_EMAIL_ALREADY_SENT_ERROR = 'Verification email already sent';
const ERROR_SENDING_VERIFICATION_EMAIL_ERROR =
  'Error sending verification email';
const VERIFICATION_REQUEST_NOT_FOUND_ERROR = 'Verification request not found';
const VERIFICATION_REQUEST_EXPIRED_ERROR = 'Verification request expired';
const PROFILE_NOT_FOUND_ERROR = 'Profile not found';
const INVALID_TOKEN_ERROR = 'Invalid token';
const PROFILE_ALREADY_VERIFIED_ERROR = 'Profile already verified';
const ERROR_VERIFICATION_PROFILE = 'Error verifying profile';

@Injectable()
export class SecurityService {
  constructor(
    private readonly securityRequestRepository: SecurityRequestRepository,
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verificationRequest(accountId: string) {
    try {
      const account = await this.accountRepository.getAccountById(accountId);

      const profile = await this.checkProfile(accountId);

      if (!profile) {
        throw new HttpException(
          { message: PROFILE_ALREADY_VERIFIED_ERROR },
          HttpStatus.BAD_REQUEST,
        );
      }

      const securityRequest =
        await this.securityRequestRepository.getByAccountId(accountId);

      if (securityRequest && securityRequest.expires > Date.now()) {
        throw new HttpException(
          { message: VERIFICATION_EMAIL_ALREADY_SENT_ERROR },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (securityRequest) {
        await this.securityRequestRepository.delete(
          accountId,
          securityRequest.token,
        );
      }

      const token = this.generateToken(accountId);

      const expires = Date.now() + 3600000;

      await this.securityRequestRepository.create(accountId, {
        token,
        expires,
      });

      await this.mailService.sendVerificationEmail(account.email, {
        id: account.id,
        token,
      });
    } catch (e) {
      throw new HttpException(
        { message: ERROR_SENDING_VERIFICATION_EMAIL_ERROR, reason: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'Verification email sent' };
  }

  async checkVerificationRequest(accountId: string, mustExist = true) {
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

  public async verifyProfile({
    accountId,
    token,
  }: {
    accountId: string;
    token: string;
  }) {
    try {
      const securityRequest = await this.checkVerificationRequest(accountId);

      if (securityRequest.token !== token) {
        throw new HttpException(
          { message: INVALID_TOKEN_ERROR },
          HttpStatus.BAD_REQUEST,
        );
      }

      const profile = await this.checkProfile(accountId);

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

  private async checkProfile(accountId: string) {
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

  private generateToken(accountId: string) {
    return this.jwtService.sign(
      { accountId },
      {
        expiresIn: '1h',
        secret: this.configService.get<string>('JWT_REQUEST_SECRET'),
      },
    );
  }
}
