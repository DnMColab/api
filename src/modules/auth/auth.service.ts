import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { AccountRepository } from 'src/repositories/account.repository';
import { AuthDTO } from 'src/DTO/auth.dto';
import { ConfigService } from '@nestjs/config';

const INVALID_CREDENTIALS_ERROR = 'Invalid credentials';
const INVALID_TOKEN_ERROR = 'Invalid token';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(credentials: AuthDTO): Promise<{ accessToken: string }> {
    const account = await this.accountRepository.getAccountBy({
      email: credentials.email,
    });

    if (!account || !(await compare(credentials.password, account.password))) {
      throw new HttpException(
        { message: INVALID_CREDENTIALS_ERROR },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.jwtService.sign(
      { id: account.id },
      { secret: this.configService.get<string>('JWT_REST_SECRET') },
    );

    return { accessToken };
  }

  public async refresh(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_REST_SECRET'),
    });

    const accountExists = await this.accountRepository.getAccountBy({
      id: payload.id,
    });

    if (!accountExists) {
      throw new HttpException(
        { message: INVALID_TOKEN_ERROR },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.jwtService.sign(
      { id: accountExists.id },
      { secret: this.configService.get<string>('JWT_REST_SECRET') },
    );

    return { accessToken };
  }
}
