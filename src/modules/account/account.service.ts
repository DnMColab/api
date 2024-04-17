import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

import { AccountRepository } from 'src/repositories/account.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { AccountCreateDTO, AccountUpdateDTO } from 'src/DTO/account.dto';
import { AccountModel } from 'src/models/account.model';

const ACCOUNT_ALREADY_EXISTS_ERROR = 'Account already exists';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
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
        ACCOUNT_ALREADY_EXISTS_ERROR,
        HttpStatus.CONFLICT,
      );
    }

    const saltRounds = this.configService.get<number>('BCRYPT_SALT_ROUNDS', 16);
    data.password = await hash(data.password, saltRounds);

    const account = await this.accountRepository.createAccount(data);

    return new AccountModel(account);
  }

  public async getAccount(accountId: string) {
    const account = await this.accountRepository.getAccountById(accountId);

    return new AccountModel({
      ...account,
    });
  }

  public async updateAccount(data: AccountUpdateDTO, accountId: string) {
    const updateAccount = await this.accountRepository.updateAccount(
      accountId,
      data,
    );

    return new AccountModel(updateAccount);
  }
}
