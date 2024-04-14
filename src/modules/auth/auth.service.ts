import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { AccountRepository } from 'src/repositories/account.repository';
import { TokenManageService } from 'src/utils/jwt.util';
import { AuthDTO } from 'src/DTO/auth.dto';

const INVALID_CREDENTIALS_ERROR = 'Invalid credentials';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private tokenService: TokenManageService,
  ) {}

  public async login(credentials: AuthDTO): Promise<{ accessToken: string }> {
    const account = await this.accountRepository.getAccountBy({
      email: credentials.email,
    });

    if (!account || !(await compare(credentials.password, account.password))) {
      throw new HttpException(
        INVALID_CREDENTIALS_ERROR,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.tokenService.generateRestApiToken({
      id: account.id,
    });

    return { accessToken };
  }

  public async refresh(accountId: string) {
    const accessToken = this.tokenService.generateRestApiToken({
      id: accountId,
    });

    return { accessToken };
  }
}
