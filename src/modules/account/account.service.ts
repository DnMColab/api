import { HttpException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AccountCreateDTO } from 'src/DTO/account.dto';
import { AccountRepository } from 'src/repositories/account.repository';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  public async createAccount(data: AccountCreateDTO) {
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
          message: 'Account already exists',
        },
        400,
      );
    }

    data.password = await hash(data.password, 16);

    return this.accountRepository.createAccount(data);
  }
}
