import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

import { AccountRepository } from 'src/repositories/account.repository';
import { AccountCreateDTO } from 'src/DTO/account.dto';
import { AccountModel } from 'src/models/account.model';

const ACCOUNT_ALREADY_EXISTS_ERROR = 'Account already exists';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly configService: ConfigService,
  ) {}

  public async createAccount(data: AccountCreateDTO): Promise<AccountModel> {
    const existingAccount = await this.accountRepository.getAccountBy({
      OR: [
        {
          email: data.email,
        },
        {
          username: data.username,
        },
      ],
    });

    if (existingAccount) {
      throw new HttpException(
        {
          message: ACCOUNT_ALREADY_EXISTS_ERROR,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS', 16);
    data.password = await hash(data.password, saltRounds);

    const account = await this.accountRepository.createAccount(data);

    return new AccountModel(account);
  }
}
