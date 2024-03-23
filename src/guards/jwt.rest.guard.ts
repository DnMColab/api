import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

import { AccountRepository } from 'src/repositories/account.repository';
import { AuthPayloadDTO } from 'src/DTO/auth.dto';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private accountRepository: AccountRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new HttpException('Unauthorized', 401);
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException('Unauthorized', 401);
      }

      const payload: AuthPayloadDTO = this.jwtService.verify(token, {
        secret: process.env.JWT_REST_SECRET,
      }) as AuthPayloadDTO;

      if (!payload) {
        throw new HttpException('Unauthorized', 401);
      }

      const existsAccount = await this.accountRepository.getAccountById(
        payload.id,
      );

      if (!existsAccount) {
        throw new HttpException('Unauthorized', 401);
      }

      request.account = { id: existsAccount.id };
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }

    return true;
  }
}
