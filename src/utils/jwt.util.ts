import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDTO } from 'src/DTO/auth.dto';

@Injectable()
export class TokenManageService {
  constructor(
    public readonly configService: ConfigService,
    public readonly jwtService: JwtService,
  ) {}

  public generateRestApiToken(payload: AuthPayloadDTO) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get<string>('JWT_REST_SECRET'),
    });
  }

  public generateWSApiToken(payload: AuthPayloadDTO) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get<string>('JWT_WS_SECRET'),
    });
  }

  public generateVerificationToken(payload: AuthPayloadDTO) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get<string>('JWT_VERIFICATION_SECRET'),
    });
  }

  public verifyRestApiToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_REST_SECRET'),
    });
  }

  public verifyWSApiToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_WS_SECRET'),
    });
  }

  public verifyVerificationToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_VERIFICATION_SECRET'),
    });
  }
}
