import { ConfigService } from '@nestjs/config';
import { RequestType } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthPayloadDTO } from 'src/DTO/auth.dto';

@Injectable()
export class TokenManageService {
  constructor(
    public readonly configService: ConfigService,
    public readonly jwtService: JwtService,
  ) {}

  public generateRestApiToken(payload: AuthPayloadDTO): string {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get<string>('JWT_REST_SECRET'),
    });
  }

  public generateRequestToken(
    payload: AuthPayloadDTO,
    type: RequestType,
  ): string {
    return this.jwtService.sign(
      {
        ...payload,
        type,
      },
      {
        expiresIn: '1d',
        secret: this.configService.get<string>('JWT_REQUEST_SECRET'),
      },
    );
  }

  public verifyRestApiToken(token: string): AuthPayloadDTO {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_REST_SECRET'),
    });
  }

  public verifyRequestToken(token: string): AuthPayloadDTO & { type: string } {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_REQUEST_SECRET'),
    });
  }
}
