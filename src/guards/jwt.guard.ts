import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

Injectable();
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new HttpException('Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new HttpException('Unauthorized', 401);
    }

    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }

    return true;
  }
}
