import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repositories/account.repository';
import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { TokenManageService } from 'src/utils/jwt.util';
import { MailService } from 'src/utils/mail.util';

import {
  PROFILE_ALREADY_VERIFIED_ERROR,
  VERIFICATION_EMAIL_ALREADY_SENT_ERROR,
  Utils,
} from './utils';

@Injectable()
export class RequestsSecurityService {
  constructor(
    private readonly securityRequestRepository: SecurityRequestRepository,
    private readonly accountRepository: AccountRepository,
    private readonly utils: Utils,
    private readonly mailService: MailService,
    private readonly tokenService: TokenManageService,
  ) {}

  async verificationRequest(accountId: string) {
    const account = await this.accountRepository.getAccountById(accountId);

    const profile = await this.utils.checkProfile(accountId);

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

    const token = this.tokenService.generateVerificationToken({
      id: account.id,
    });

    const expires = Date.now() + 3600000;

    await this.securityRequestRepository.create(accountId, {
      token,
      expires,
    });

    await this.mailService.sendVerificationEmail(account.email, {
      id: account.id,
      token,
    });

    return { message: 'Verification email sent' };
  }
}
