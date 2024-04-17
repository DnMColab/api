import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repositories/account.repository';
import { SecurityRequestRepository } from 'src/repositories/security.repository';
import { TokenManageService } from 'src/utils/jwt.util';
import { MailService } from 'src/utils/mail.util';

import {
  VERIFICATION_EMAIL_ALREADY_SENT_ERROR,
  Utils,
  VERIFICATION_REQUEST_NOT_FOUND_ERROR,
} from './utils';
import { RequestType } from '@prisma/client';

const mailReasons = {
  [RequestType.EMAIL_VERIFICATION]: 'Email verification',
  [RequestType.EMAIL_CHANGE]: 'Email change',
  [RequestType.PASSWORD_RESET]: 'Password reset',
};

@Injectable()
export class RequestsSecurityService {
  constructor(
    private readonly securityRequestRepository: SecurityRequestRepository,
    private readonly accountRepository: AccountRepository,
    private readonly utils: Utils,
    private readonly mailService: MailService,
    private readonly tokenService: TokenManageService,
  ) {}

  async makeRequest(requestType: RequestType, accountId: string) {
    if (!requestType || !(requestType in RequestType)) {
      throw new HttpException('Invalid request type', HttpStatus.BAD_REQUEST);
    }

    const account = await this.accountRepository.getAccountById(accountId);

    await this.utils.checkProfile(accountId, requestType);

    const request =
      await this.securityRequestRepository.getByAccountId(accountId);

    if (
      request &&
      request.expires > Date.now() &&
      requestType === request.type
    ) {
      throw new HttpException(
        VERIFICATION_EMAIL_ALREADY_SENT_ERROR,
        HttpStatus.CONFLICT,
      );
    }

    if (request && request.expires < Date.now()) {
      await this.securityRequestRepository.delete(accountId, request.token);
    }

    const token = this.tokenService.generateRequestToken(
      { id: accountId },
      requestType,
    );

    await this.mailService.sendMail(
      account.email,
      {
        subject: mailReasons[requestType],
        link: `http://localhost:3000/verify/${token}`,
      },
      requestType,
    );

    await this.securityRequestRepository.create(accountId, {
      token,
      expires: Date.now() + 1000 * 60 * 60 * 24,
      type: requestType,
    });

    return { message: 'Request succesfully sent' };
  }

  async rejectVerificationRequest(
    accountId: string,
  ): Promise<{ message: string }> {
    const securityRequest =
      await this.securityRequestRepository.getByAccountId(accountId);

    if (!securityRequest) {
      throw new HttpException(
        VERIFICATION_REQUEST_NOT_FOUND_ERROR,
        HttpStatus.CONFLICT,
      );
    }

    await this.securityRequestRepository.delete(
      accountId,
      securityRequest.token,
    );

    return { message: 'Request rejected successfully' };
  }
}
