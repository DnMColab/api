import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { AuthValidation } from 'src/validation/auth.validation';

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('/')
  public async login(@Body(new ZodPipe(AuthValidation)) credentials) {
    return this.authService.login(credentials);
  }
}
