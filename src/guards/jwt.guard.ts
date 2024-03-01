import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDTO } from 'src/DTO/auth.dto';
import { AccountRepository } from 'src/repositories/account.repository';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private accountRepository: AccountRepository,
  ) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('Unauthorized', 401);
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('Unauthorized', 401);
    }

    try {
      const user: AuthPayloadDTO = this.jwtService.decode(
        token,
      ) as AuthPayloadDTO;

      const account = this.accountRepository.getAccountById(user.id);

      if (!account) {
        throw new HttpException('Unauthorized', 401);
      }

      request.user = account;
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }

    return true;
  }
}
