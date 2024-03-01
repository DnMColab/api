import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthDTO } from 'src/DTO/auth.dto';

import { AccountRepository } from 'src/repositories/account.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(credentials: AuthDTO): Promise<{ token: string }> {
    const account = await this.accountRepository.getAccountBy({
      email: credentials.email,
    });

    if (!account) {
      throw new HttpException({ message: 'Invalid credentials' }, 401);
    }

    if (!compare(credentials.password, account.password)) {
      throw new HttpException({ message: 'Invalid credentials' }, 401);
    }

    const token = this.jwtService.sign(
      { id: account.id },
      { secret: process.env.JWT_REST_SECRET },
    );

    return { token };
  }
}
